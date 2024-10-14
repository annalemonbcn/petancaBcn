function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: 41.40986034274614, lng: 2.1871164233368017 },
    mapTypeControl: false,
  });

  // Name
  // Lat, lng
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
