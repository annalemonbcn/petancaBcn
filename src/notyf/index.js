let notyf;

const initializeNotyf = () => {
  notyf = new Notyf({
    duration: 3000,
    position: {
      x: "right",
      y: "top",
    },
  });
};

initializeNotyf();

export { notyf };
