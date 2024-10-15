const markers = [
  {
    name: "Pistes de Petanca la Llosa del Bon Pastor",
    lat: 41.43685278329868,
    lng: 2.2090017756302776,
  },
  {
    name: "Pistes Municipals de Petanca Exposició",
    lat: 41.37122765895013,
    lng: 2.162878181473128,
  },
  {
    name: "Club de Petanca Amics de Nou Barris",
    lat: 41.44602969483294,
    lng: 2.184595591064207,
  },
  {
    name: "Pistes Municipals de Petanca Sant Joan",
    lat: 41.40318752777066,
    lng: 2.1641778235213587,
  },
];

function getLocationFromArray(position) {
  const minValue = 0;
  const maxValue = markers.length - 1;

  if (position > maxValue || position < minValue) {
    console.alert("Position does not exist in array");
    return;
  }

  return markers[position];
}

function initMap() {
  alert('Welcome to petancaBCN!')
  const initLocation = getLocationFromArray(0);

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: initLocation.lat, lng: initLocation.lng },
    mapTypeControl: false,
  });

  for (let i = 0; i < markers.length; i++) {
    const currMarker = markers[i];

    const marker = new google.maps.Marker({
      position: { lat: markers[i].lat, lng: markers[i].lng },
      map: map,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: markers[i].name,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  }
}
