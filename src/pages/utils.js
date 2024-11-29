const renderBooking = ({ id, court, day, hour }, idx) => {
  const html = `
    <div class="booking" data-id="${id}">
      <div class="info">
        <h3 class="title">Booking #${idx + 1}</h3>
        <p class="court">${court}</p>
        <div class="day">Day: ${day}</div>
        <div class="hour">Hour: ${hour}</div>
      </div>
      <div class="cancel">
        <img src="/src/svg/cross.svg" width="18">
      </div>
    </div>
  `;

  return html;
};

export { renderBooking };
