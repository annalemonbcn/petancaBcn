const users = [];
let continueFlag = false;
let currentName = "";
let currentSurname = "";

const askPrompt = (question) => prompt(question);

const validateField = (fieldValue, fieldName) => {
  if (fieldValue.length === 0) {
    alert(`El campo ${fieldName} debe contener al menos 1 carácter`);
    return false;
  }
  return true;
};

const askForField = (fieldName) => {
  let fieldValue;
  do {
    fieldValue = askPrompt(`Introduce tu ${fieldName.toLowerCase()}`);
  } while (!validateField(fieldValue, fieldName));
  return fieldValue;
};

const addUser = () => {
  currentName = askForField("nombre");
  currentSurname = askForField("apellido");

  users.push({ name: currentName, surname: currentSurname });
};

const askIfContinue = () => {
  if (confirm("Deseas añadir otro usuario?") === true) {
    continueFlag = true;
  } else {
    continueFlag = false;
  }
};

const sayHi = () => {
  addUser();
  askIfContinue();
};

do {
  sayHi();
} while (continueFlag);

console.log("users :>> ", users);
