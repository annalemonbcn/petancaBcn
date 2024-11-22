import { getAllFavourites } from "../utils/localStorage.js";

const dataToMarkers = (data) => {
  const favourites = getAllFavourites();

  return data.map((marker) => {
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
};

export { dataToMarkers };
