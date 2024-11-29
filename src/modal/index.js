import { init, resetData } from "../calendar/index.js";

const openModal = (bookingModal, marker) => {
  bookingModal.style.display = "block";

  init();
};

const closeModal = (bookingModal) => {
  resetData();
  bookingModal.style.display = "none";
};

export { openModal, closeModal };
