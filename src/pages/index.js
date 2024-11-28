import { createHeader } from "../utils/header.js";
import { getAllBookings } from "../utils/localStorage.js";

const bookingsEl = document.getElementById("bookings");

createHeader();
document.getElementById("app-content").classList.add("show");

const renderBookings = () => {
  const bookings = getAllBookings();

  bookings.forEach(({ id, court, day, hour }, idx) => {
    const container = document.createElement("div");
    container.classList.add("booking");
    container.dataset.id = id;

    const infoContainer = document.createElement("div");
    infoContainer.className = "info";
    container.appendChild(infoContainer);

    const crossContainer = document.createElement("div");
    crossContainer.className = "cancel";
    container.appendChild(crossContainer);

    const icon = document.createElement("img");
    icon.src = "/src/svg/cross.svg";
    icon.width = 18;
    crossContainer.appendChild(icon);

    const title = document.createElement("h3");
    title.className = "title";
    title.innerHTML = `Booking #${idx + 1}`;
    infoContainer.appendChild(title);

    const nameContainer = document.createElement("p");
    nameContainer.className = "court";
    nameContainer.innerHTML = court;
    infoContainer.appendChild(nameContainer);

    const dayContainer = document.createElement("div");
    dayContainer.className = "day";
    dayContainer.innerHTML = `Day: ${day}`;
    infoContainer.appendChild(dayContainer);

    const hourContainer = document.createElement("div");
    hourContainer.className = "hour";
    hourContainer.innerHTML = `Hour: ${hour}`;
    infoContainer.appendChild(hourContainer);

    bookingsEl.appendChild(container);
  });
};

renderBookings();

const crossElements = document.querySelectorAll(".booking .cancel img");
const modal = document.querySelector(".modal#modal-delete");
const courtNameEl = document.querySelector(".modal#modal-delete .court-name");

// Add listeners to cross elements
crossElements.forEach((crossEl) => {
  crossEl.onclick = (e) => {
    const booking = e.target.closest(".booking");
    openModal(booking);
  };
});

const openModal = (booking) => {
  modal.style.display = "block";

  const bookingName = booking.children[0].children[1].innerHTML;
  courtNameEl.innerHTML = bookingName;

  const bookingId = booking.dataset.id;
};
