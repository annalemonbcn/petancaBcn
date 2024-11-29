import { init, resetData } from "../calendar/index.js";

const openModal = (bookingModal, marker) => {
  bookingModal.style.display = "block";

  const markerNameEl = document.querySelector(".modal .marker-name");
  markerNameEl.innerHTML = marker.name;

  const modalBody = document.querySelector(".modal #modal-body");
  modalBody.dataset.modalId = marker.id;

  init();
};

const closeModal = (bookingModal) => {
  resetData();
  bookingModal.style.display = "none";
};

export { openModal, closeModal };
