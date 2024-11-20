export const FAVORITES_KEY_PREFIX = "favourite_";

const getAllFavourites = () => {
  const favourites = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(FAVORITES_KEY_PREFIX)) {
      favourites.push(JSON.parse(localStorage.getItem(key)));
    }
  }

  return favourites;
};

const removeFavourite = (favId) => {
  localStorage.removeItem(`${FAVORITES_KEY_PREFIX}${favId}`);
};

export { getAllFavourites, removeFavourite };
