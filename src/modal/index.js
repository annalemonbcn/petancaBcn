const openModal = (bookingModal, marker) => {
  bookingModal.style.display = "block";

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
        <h2>Book track "${marker.name}"</h2>
    `;
};

const closeModal = (bookingModal) => {
  bookingModal.style.display = "none";
};

export { openModal, closeModal };
