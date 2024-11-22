import { updateMap } from "../map/initmap.js";
import { filterMarkersByDistrict } from "../map/utils.js";

const toggleLoader = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.style.display = "block";
  } else {
    loader.style.display = "none";
  }
};

const toggleShowFavs = (useFavs, markers, selector) => {
  if (useFavs) {
    updateMap(
      markers.filter((marker) => marker.isFav),
      markers,
      selector.value
    );
    selector.value = "All";
  } else {
    updateMap(
      filterMarkersByDistrict(selector.value || "All", markers),
      markers,
      selector.value
    );
  }
};

export { toggleLoader, toggleShowFavs };
