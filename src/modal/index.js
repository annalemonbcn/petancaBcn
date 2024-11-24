const bookingModal = document.getElementById("modal-booking");
const trigger = document.getElementById("btn-openModal");
const icoClose = document.getElementById("ico-close");

// Open the modal
trigger.onclick = () => {
  bookingModal.style.display = "block";
};

// Close the modal
icoClose.onclick = () => {
  bookingModal.style.display = "none";
};

// Close the modal if click anywhere outside of the modal
window.onclick = (event) => {
  if (event.target == bookingModal) {
    bookingModal.style.display = "none";
  }
};
