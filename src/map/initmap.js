import { heart } from "../svg/heart.js";
import { heartFill } from "../svg/heart-fill.js";
import {
  toggleFavourite,
  filterMarkersByDistrict,
  updateMarker,
} from "./utils.js";

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

const updateMap = (filteredMarkers, originalMarkers, selectorValue) => {
  // Clear existing markers
  markersInMap.forEach((marker) => marker.setMap(null));
  markersInMap = [];

  // Add new markers
  filteredMarkers.forEach((marker) => {
    const currMarker = new google.maps.Marker({
      position: {
        lat: marker.coordinates.lat,
        lng: marker.coordinates.long,
      },
      map: map,
    });

    const markerAddress = `${marker.address.road_name}, ${marker.address.street_number}, ${marker.address.zip_code}, ${marker.address.district_name}`;

    const heartIcon = marker.isFav ? heartFill : heart;

    const contentString =
      '<div id="infoWindow">' +
      '<div id="infoWindow-header">' +
      `<h3 id="infoWindow-header-title">${marker.name}</h3>` +
      '<div id="heart-container">' +
      heartIcon +
      "</div>" +
      "</div>" +
      '<div id="infoWindow-body-address">' +
      '<p id="address-title">Address:</p>' +
      `<p id="address-body">${markerAddress}</p>` +
      "</div>" +
      '<div id="street-view-container" style="width: 100%; height: 150px;"></div>' +
      `<div id="infoWindow-link"><a href="https://www.google.com/maps/dir/?api=1&destination=${markerAddress}" target="_blank">Take me there</a></div>`;

    const infoWindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 400,
    });

    currMarker.addListener("click", () => {
      if (openInfoWindow) openInfoWindow.close();

      infoWindow.open(map, currMarker);
      openInfoWindow = infoWindow;
    });

    // Add event listener after InfoWindow is opened
    google.maps.event.addListenerOnce(infoWindow, "domready", () => {
      const heartContainer = document.getElementById("heart-container");
      heartContainer.addEventListener("click", () => {
        // add to favs array
        toggleFavourite(marker);
        // update originalMarkers
        updateMarker(marker.id, originalMarkers);
        // updateMap with favs
        updateMap(
          filterMarkersByDistrict(selectorValue || "All", originalMarkers),
          originalMarkers,
          selectorValue
        );
      });
    });

    google.maps.event.addListenerOnce(infoWindow, "domready", () => {
      initializeStreetView(marker.coordinates.lat, marker.coordinates.long);
    });

    markersInMap.push(currMarker);

    // updateMarker(currMarker, infoWindow);
  });
};

function initMap(filteredMarkers, originalMarkers, selectorValue) {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: {
      lat: filteredMarkers.at(0).coordinates.lat,
      lng: filteredMarkers.at(0).coordinates.long,
    },
    mapTypeControl: false,
  });

  updateMap(filteredMarkers, originalMarkers, selectorValue);
}

export { initMap, updateMap };
