const filterMarkersByDistrict = (district, markers) => {
  if (district === "All") return markers;
  return markers.filter((marker) => marker.address.district_name === district);
};

const addToFavourites = (newFav, favs) => {
  console.log("newFav >>", newFav);
  if (!favs.find((marker) => marker.id === newFav.id)) {
    favs.push(newFav);
  }
  console.log("favs >>", favs);
};

export { filterMarkersByDistrict, addToFavourites };
