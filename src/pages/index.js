import { createHeader } from "../utils/header.js";
import { getAllBookings } from "../utils/localStorage.js";
import { cross } from "../svg/cross.js";

const bookingsEl = document.getElementById("bookings");

createHeader();
document.getElementById("app-content").classList.add("show");

const bookings = getAllBookings();
console.log("bookings", bookings);

bookings.forEach(({ id, court, day, hour }, idx) => {
  const container = document.createElement("div");
  container.classList.add("booking", `booking-${id}`);

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
