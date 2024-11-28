export const FAVORITES_KEY_PREFIX = "favourite_";
export const BOOKINGS_KEY_PREFIX = "booking_";

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

const getAllBookings = () => {
  const bookings = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(BOOKINGS_KEY_PREFIX)) {
      bookings.push(JSON.parse(localStorage.getItem(key)));
    }
  }

  return bookings;
};

const removeBooking = (bookingId) => {
  localStorage.removeItem(`${BOOKINGS_KEY_PREFIX}${bookingId}`);
};

export { getAllFavourites, removeFavourite, getAllBookings, removeBooking };
