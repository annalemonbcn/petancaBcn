const headerItems = [
  {
    id: "header-h1",
    content: "<h1>PetancaBCN</h1>",
    linkTo: "/",
  },
  {
    id: "header-favs",
    content: `
      <img src="/src/svg/glasses-white.svg" width="30" />
      <p>favs</p>
    `,
  },
  {
    id: "header-bookings",
    content: "bookings",
    linkTo: "/src/pages/bookings/bookings.html",
  },
];

const createHeader = () => {
  const header = document.querySelector("header");
  headerItems.forEach((item) => {
    // Create container
    const itemContainer = document.createElement("div");
    itemContainer.id = item.id;
    // Create a
    let child;
    if (!item.id.includes("fav")) {
      child = document.createElement("a");
      child.href = item.linkTo;
      child.innerHTML = item.content;
      // Add a to container
      itemContainer.append(child);
    } else {
      itemContainer.innerHTML = item.content;
    }
    // Add container to header
    header.append(itemContainer);
  });
};

export { createHeader };
