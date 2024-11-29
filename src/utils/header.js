import { glassesWhite } from "../svg/glasses-white.js";

const headerItems = [
  {
    id: "header-favs",
    content: `
      ${glassesWhite}
      <p>favs</p>
    `,
  },
  {
    id: "header-h1",
    content: "<h1>PetancaBCN</h1>",
    linkTo: "/",
  },
  {
    id: "header-bookings",
    content: "bookings",
    linkTo: "/src/pages/bookings.html",
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
