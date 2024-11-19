let map;
let markersInMap = [];
let openInfoWindow = undefined;

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

const updateMap = (markers) => {
  // Clear existing markers
  markersInMap.forEach((marker) => marker.setMap(null));
  markersInMap = [];

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

    markersInMap.push(currMarker);
  });
};

function initMap(filteredMarkers) {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: {
      lat: filteredMarkers[5].coordinates.lat,
      lng: filteredMarkers[5].coordinates.long,
    },
    mapTypeControl: false,
  });

  // filteredMarkers = filterMarkersByDistrict(selector.value || "All", markers);
  updateMap(filteredMarkers);
}

export { initMap, updateMap };
