const openModal = (bookingModal, marker) => {
  bookingModal.style.display = "block";

  const markerNameEl = document.querySelector(".modal .marker-name");
  markerNameEl.innerHTML = marker.name;

  const modalBody = document.querySelector(".modal #modal-body");
  modalBody.dataset.modalId = marker.id;
};

const closeModal = (bookingModal) => (bookingModal.style.display = "none");

export { openModal, closeModal };
