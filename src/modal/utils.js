const bookingView = document.querySelector("#modal-body .booking");
const bookingConfirm = document.querySelector("#modal-body .confirm");

const toggleView = () => {
  if (bookingView.style.display === "none") {
    bookingConfirm.style.display = "none";
    bookingView.style.display = "block";
    return;
  }

  bookingView.style.display = "none";
  bookingConfirm.style.display = "block";
};

const resetBookingView = () => {
  if ((bookingConfirm.style.display === "none")) return;

  bookingConfirm.style.display = "none";
  bookingView.style.display = "block";
};

export { toggleView, resetBookingView };
