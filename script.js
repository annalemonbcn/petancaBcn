import { fetchAllRecords } from "./src/api/fetchAllRecords.js";
import { filterMarkersByDistrict } from "./src/map/filterMarkersByDistrict.js";
import { initMap, updateMap } from "./src/map/initmap.js";
import { makeDistrictSelectorOptions } from "./src/ui/selectors.js";
import { dataToMarkers } from "./src/utils/utils.js";

const PROXY_URL = "https://tranquil-bayou-06812-3a79cb983c1d.herokuapp.com/";
const API_URL =
  "https://opendata-ajuntament.barcelona.cat/data/api/action/datastore_search";

let markers = [];

async function initApp() {
  try {
    const baseUrl = PROXY_URL + API_URL;
    const params =
      "?resource_id=6409e71a-6c79-4d21-9c14-373dbd01f26d&q=pistes+municipals+de+petanca";

    // Fetch markers
    const allRecords = await fetchAllRecords(baseUrl + params);
    markers = dataToMarkers(allRecords);

    // Initialize selector + create options
    const selector = document.getElementById("districtsSelector");
    makeDistrictSelectorOptions(selector, markers);

    // Check if stored district in localStorage + set selector value to that district
    const storedDistrict = localStorage.getItem("selectedDistrict");
    selector.value = storedDistrict || "All";

    // Filter markers by selector value
    let filteredMarkers = filterMarkersByDistrict(
      selector.value || "All",
      markers
    );

    // Update the map when the selector value changes
    selector.onchange = () => {
      // TODO: not working ?
      updateMap(filterMarkersByDistrict(selector.value || "All", markers));
      localStorage.setItem("selectedDistrict", selector.value);
    };

    // Initialize map
    initMap(filteredMarkers);
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}

// Call initApp when the page loads
document.addEventListener("DOMContentLoaded", initApp);
