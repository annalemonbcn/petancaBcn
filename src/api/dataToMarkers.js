import { getAllFavourites } from "../utils/localStorage.js";

const removeDuplicates = (markers) => {
  const cleanMarkers = [];
  const seenCombinations = new Set();

  return markers.filter((marker) => {
    const combination = `${marker.address.road_name}_${marker.address.street_number}`;
    if (!seenCombinations.has(combination)) {
      cleanMarkers.push(marker);
      seenCombinations.add(combination);
      return true;
    }
    return false;
  });
};

const dataToMarkers = (data) => {
  const favourites = getAllFavourites();

  const markers = data.map((marker) => {
    const isFav = favourites.find((fav) => fav.id === marker._id)
      ? true
      : false;

    return {
      name: marker.name,
      id: marker._id,
      register_id: marker.register_id,
      coordinates: {
        lat: parseFloat(marker.geo_epgs_4326_lat),
        long: parseFloat(marker.geo_epgs_4326_lon),
      },
      address: {
        district_id: marker.addresses_district_id,
        district_name: marker.addresses_district_name,
        road_name: marker.addresses_road_name,
        street_number: marker.addresses_start_street_number,
        zip_code: `0${marker.addresses_zip_code}`,
      },
      isFav,
    };
  });

  return removeDuplicates(markers);
};

export { dataToMarkers };
