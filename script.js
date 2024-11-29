import { dataToMarkers } from "./src/api/dataToMarkers.js";
import { fetchAllRecords } from "./src/api/fetchAllRecords.js";
import { filterMarkersByDistrict } from "./src/map/utils.js";
import { initMap, updateMap } from "./src/map/initmap.js";
import { makeDistrictSelectorOptions } from "./src/ui/selectors.js";
import { toggleLoader, toggleShowFavs } from "./src/utils/utils.js";
import { PROXY_URL, API_URL } from "./src/vars/index.js";
import { createHeader } from "./src/utils/header.js";

async function initApp() {
  let useFavs = false;
  createHeader();

  try {
    const baseUrl = PROXY_URL + API_URL;
    const params =
      "?resource_id=6409e71a-6c79-4d21-9c14-373dbd01f26d&q=pist+petanca";

    toggleLoader(true);

    // Fetch markers
    const allRecords = await fetchAllRecords(baseUrl + params);
    let markers = dataToMarkers(allRecords);

    toggleLoader(false);

    document.getElementById("app-content").classList.add("show");

    // Initialize selector + create options
    const selector = document.getElementById("districtsSelector");
    makeDistrictSelectorOptions(selector, markers);

    // Check if stored district in localStorage + set selector value to that district
    const storedDistrict = localStorage.getItem("selectedDistrict");
    selector.value = storedDistrict || "All";

    const favsButton = document.getElementById("header-favs");
    favsButton.onclick = () => {
      useFavs = !useFavs;
      toggleShowFavs(useFavs, markers, selector);
    };

    // Update the map when the selector value changes
    selector.onchange = () => {
      useFavs = false;
      updateMap(
        filterMarkersByDistrict(selector.value || "All", markers),
        markers,
        selector.value || "All"
      );
      localStorage.setItem("selectedDistrict", selector.value);
    };

    // Initialize map
    initMap(
      filterMarkersByDistrict(selector.value || "All", markers),
      markers,
      selector.value || "All"
    );
  } catch (error) {
    console.error("Error initializing app:", error);
    toggleLoader(false);
  }
}

// Call initApp when the page loads
document.addEventListener("DOMContentLoaded", initApp);
