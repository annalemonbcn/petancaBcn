import { FAVORITES_KEY_PREFIX } from "../utils/localStorage.js";

const filterMarkersByDistrict = (district, markers) => {
  if (district === "All") return markers;
  return markers.filter((marker) => marker.address.district_name === district);
};


const addToFavourites = (newFav, favs) => {
  if (!favs.find((marker) => marker.id === newFav.id)) {
    favs.push(newFav);

    const favString = JSON.stringify(newFav);
    localStorage.setItem(`${FAVORITES_KEY_PREFIX}${newFav.id}`, favString);
  }
};

const updateMarker = (newFavId, markers) => {
  const selectedMarker = markers.find((marker) => marker.id === newFavId);
  selectedMarker.isFav = !selectedMarker.isFav;
};

export { filterMarkersByDistrict, addToFavourites, updateMarker };
