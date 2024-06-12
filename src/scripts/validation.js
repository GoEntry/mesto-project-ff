export const enableValidation = (dataValidation) => {
  document.querySelectorAll(dataValidation.formSelector).forEach(form => setEventListeners(form, dataValidation));
}

const setEventListeners = (form, dataValidation) => {
  const inputList = Array.from(form.querySelectorAll(dataValidation.inputSelector));
  const toggleButton = () => toggleButtonState(form, inputList, dataValidation);
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      isValid(input, dataValidation);
      toggleButton();
    });
  });
  toggleButton();
}

const showInputError = (inputElement, errorMessage, { errorClass, spanErrorClass }) => {
  const spanError = inputElement.closest('form').querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(errorClass);
  spanError.textContent = errorMessage;
  spanError.classList.add(spanErrorClass);
}

const hideInputError = (inputElement, { errorClass, spanErrorClass }) => {
  const spanError = inputElement.closest('form').querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(errorClass);
  spanError.classList.remove(spanErrorClass);
  spanError.textContent = '';
}

const isValid = (inputElement, dataValidation) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, dataValidation);
  } else {
    hideInputError(inputElement, dataValidation);
  }
}

export const toggleButtonState = (form, dataValidation) => {
  const inputList = Array.from(form.querySelectorAll(dataValidation.inputSelector));
  const buttonElement = form.querySelector(dataValidation.submitButtonSelector);
  const isFormInvalid = inputList.some(input => !input.validity.valid);
  buttonElement.disabled = isFormInvalid;
  buttonElement.classList.toggle(dataValidation.inactiveButtonClass, isFormInvalid);
}

export const clearValidation = (form, dataValidation) => {
  const inputList = Array.from(form.querySelectorAll(dataValidation.inputSelector));
  inputList.forEach((input) => {
    input.value = '';
    hideInputError(input, dataValidation);
  });
  toggleButtonState(form, dataValidation);
}


