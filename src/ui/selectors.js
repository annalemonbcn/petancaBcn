const createOption = (selector, value, text = value) => {
  const option = document.createElement("option");
  option.value = value;
  option.innerText = text;
  selector.appendChild(option);
};

const makeDistrictSelectorOptions = (selector, markers) => {
  createOption(selector, "All", "All districts");

  const selectorOptions = [
    ...new Set(markers.map((marker) => marker.address.district_name)),
  ];
  selectorOptions.map((option) => createOption(selector, option));
};

export { makeDistrictSelectorOptions };
