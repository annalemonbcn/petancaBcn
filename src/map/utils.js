import {
  FAVORITES_KEY_PREFIX,
  getAllFavourites,
  removeFavourite,
} from "../utils/localStorage.js";

const filterMarkersByDistrict = (district, markers) => {
  if (district === "All") return markers;
  return markers.filter((marker) => marker.address.district_name === district);
};

const toggleFavourite = (fav) => {
  const favourites = getAllFavourites();

  let notyf = new Notyf({
    duration: 3000,
    position: {
      x: "right",
      y: "top",
    },
  });

  // if already in favs --> delete from localStorage
  if (favourites.find((marker) => marker.id === fav.id)) {
    removeFavourite(fav.id);
    notyf.success("Removed from favourites");
  }
  // if not in favs --> add localStorage
  else {
    const favString = JSON.stringify(fav);
    localStorage.setItem(`${FAVORITES_KEY_PREFIX}${fav.id}`, favString);
    notyf.success("Added to favourites");
  }
};

const updateMarker = (newFavId, markers) => {
  const selectedMarker = markers.find((marker) => marker.id === newFavId);
  selectedMarker.isFav = !selectedMarker.isFav;
};

export { filterMarkersByDistrict, toggleFavourite, updateMarker };
