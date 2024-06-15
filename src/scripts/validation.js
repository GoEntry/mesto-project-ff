export const enableValidation = (dataValidation) => {
  const formList = Array.from(document.querySelectorAll(dataValidation.formSelector));
  formList.forEach(form => setEventListeners(form, dataValidation));
}

const setEventListeners = (form, dataValidation) => {
  const inputList = Array.from(form.querySelectorAll(dataValidation.inputSelector));
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      isValid(input, dataValidation);
      toggleButtonState(form, dataValidation);
    });
  });
}

const showInputError = (element, errorMessage, dataValidation) => {
  const form = element.closest(dataValidation.formSelector);
  const spanError = form.querySelector(`.${element.id}-error`);
  if (spanError) {
    element.classList.add(dataValidation.errorClass);
    spanError.textContent = errorMessage;
    spanError.classList.add(dataValidation.spanErrorClass);
  }
}

const hideInputError = (element, dataValidation) => {
  const form = element.closest(dataValidation.formSelector);
  const spanError = form.querySelector(`.${element.id}-error`);
  if (spanError) {
    element.classList.remove(dataValidation.errorClass);
    spanError.classList.remove(dataValidation.spanErrorClass);
  }
}

const isValid = (inputElement, dataValidation) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage || '');
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, dataValidation);
  } else {
    hideInputError(inputElement, dataValidation);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

export const toggleButtonState = (form, dataValidation) => {
  const inputList = Array.from(form.querySelectorAll(dataValidation.inputSelector));
  const buttonElement = form.querySelector(dataValidation.submitButtonSelector);

  if (buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(dataValidation.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(dataValidation.inactiveButtonClass);
    }
  }
}

export const clearValidation = (form, dataValidation) => {
  const inputList = Array.from(form.querySelectorAll(dataValidation.inputSelector))
  form.querySelector(dataValidation.formSelector).reset()
  inputList.forEach((input) => {
    hideInputError(input, dataValidation)
  })
  toggleButtonState(form, dataValidation)
}