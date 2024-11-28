import { createHeader } from "../utils/header.js";

const init = () => {
  createHeader();
  document.getElementById("app-content").classList.add("show");
};

init();
