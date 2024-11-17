const PROXY_URL = "https://tranquil-bayou-06812-3a79cb983c1d.herokuapp.com/";
const API_URL =
  "https://opendata-ajuntament.barcelona.cat/data/api/action/datastore_search";

const fetchAllRecords = async (url, records = [], offset = 0) => {
  const response = await fetch(`${url}&offset=${offset}`);
  const data = await response.json();

  records.push(...data.result.records);

  if (data.result.total > records.length) {
    const nextOffset = offset + 100;
    return await fetchAllRecords(url, records, nextOffset);
  }

  return records;
};

const fetchMarkers = async () => {
  const baseUrl = PROXY_URL + API_URL;
  const params = "?resource_id=6409e71a-6c79-4d21-9c14-373dbd01f26d&q=petanca";

  try {
    const allRecords = await fetchAllRecords(baseUrl + params);
    console.log("All records:", allRecords);
    // Process allRecords here, e.g., add markers to your map
  } catch (error) {
    console.error("Error fetching records:", error);
  }
};

fetchMarkers();

const mockMarkers = [];

const dataToMarkers = (data) =>
  data.map((marker) => ({
    name: marker.name,
    id: marker._id,
    register_id: marker.register_id,
    coordinates: {
      lat: parseFloat(marker.geo_epgs_4326_lat),
      long: parseFloat(marker.geo_epgs_4326_lon),
    },
    address: {
      district_id: marker.addresses_district_id,
      district_name: marker.addresses_district_name,
      road_name: marker.addresses_road_name,
      street_number: marker.addresses_start_street_number,
      zip_code: `0${marker.addresses_zip_code}`,
    },
  }));

const filterMarkersByDistrict = (district, markers) => {
  if (district === "All") return markers;
  return markers.filter((marker) => marker.address.district_name === district);
};

const createOption = (selector, value, text = value) => {
  const option = document.createElement("option");
  option.value = value;
  option.innerText = text;
  selector.appendChild(option);
};

const makeDistrictSelectorOptions = (markers) => {
  const selector = document.getElementById("districtsSelector");
  createOption(selector, "All", "All districts");

  const selectorOptions = [
    ...new Set(markers.map((marker) => marker.address.district_name)),
  ];
  selectorOptions.map((option) => createOption(selector, option));
};

// Map data from db to easy-reading shape
const markers = dataToMarkers(mockMarkers);

// Get selector options + create the options
const selector = document.getElementById("districtsSelector");
makeDistrictSelectorOptions(markers);

// Get filtered markers
let filteredMarkers = filterMarkersByDistrict(selector.value || "All", markers);

const storedDistrict = localStorage.getItem("selectedDistrict");
selector.value = storedDistrict || "All";

// Update the map when the selector value changes
selector.onchange = () => {
  filteredMarkers = filterMarkersByDistrict(selector.value || "All", markers);
  updateMap(filteredMarkers);
  localStorage.setItem("selectedDistrict", selector.value);
};

let map;
let markersArray = [];
let openInfoWindow = undefined;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: {
      lat: filteredMarkers[5].coordinates.lat,
      lng: filteredMarkers[5].coordinates.long,
    },
    mapTypeControl: false,
  });

  filteredMarkers = filterMarkersByDistrict(selector.value || "All", markers);
  updateMap(filteredMarkers);
}

const updateMap = (markers) => {
  // Clear existing markers
  markersArray.forEach((marker) => marker.setMap(null));
  markersArray = [];

  // Add new markers
  markers.forEach((marker) => {
    const currMarker = new google.maps.Marker({
      position: {
        lat: marker.coordinates.lat,
        lng: marker.coordinates.long,
      },
      map: map,
    });

    const markerAddress = `${marker.address.road_name}, ${marker.address.street_number}, ${marker.address.zip_code}, ${marker.address.district_name}`;

    const contentString =
      '<div id="infoWindow">' +
      '<div id="infoWindow-header">' +
      `<h3 id="infoWindow-header-title">${marker.name}</h3>` +
      '<i class="far fa-heart"></i>' +
      "</div>" +
      '<div id="infoWindow-body-address">' +
      '<p id="address-title">Address:</p>' +
      `<p id="address-body">${markerAddress}</p>` +
      "</div>" +
      '<div id="street-view-container" style="width: 100%; height: 150px;"></div>' +
      `<div><a href="https://www.google.com/maps/dir/?api=1&destination=${markerAddress}" target="_blank">Take me there</a></div>`;

    const infoWindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 400,
    });

    currMarker.addListener("click", () => {
      if (openInfoWindow) openInfoWindow.close();

      infoWindow.open(map, currMarker);
      openInfoWindow = infoWindow;
    });

    google.maps.event.addListenerOnce(infoWindow, "domready", () => {
      initializeStreetView(marker.coordinates.lat, marker.coordinates.long);
    });

    markersArray.push(currMarker);
  });
};

const initializeStreetView = (lat, lng) => {
  const streetViewService = new google.maps.StreetViewService();

  // Check if Street View imagery is available at the location
  streetViewService.getPanorama(
    { location: { lat, lng }, radius: 50 },
    (data, status) => {
      if (status === google.maps.StreetViewStatus.OK) {
        // Create a Street View panorama
        const panorama = new google.maps.StreetViewPanorama(
          document.getElementById("street-view-container"),
          {
            position: { lat, lng },
            pov: {
              heading: 90,
              pitch: 10,
            },
            addressControl: false,
          }
        );
      } else {
        document.getElementById("street-view-container").innerHTML =
          "No Street View available";
      }
    }
  );
};
