function togglePopUp(element) {
  if (!element.classList.contains('popup_is-opened')) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', Esc);
  } else {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', Esc);
  }
}
function Esc(element) {
  if (element.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    togglePopUp(openedPopup);
  }
}
function Overlay(element) {
  const openedPopup = element.target;
  if (openedPopup.classList.contains('popup')) {
    togglePopUp(openedPopup);
  }
}
export {togglePopUp, Overlay}