import './pages/index.css';
import initialCards from "./scripts/cards";
import {togglePopUp, pressOverlay} from "./scripts/modal";
import * as cardElement from "./scripts/card";
import avatar from './images/avatar.jpg';

const content = document.querySelector('.content');
const editPopUp = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const addPopUp = document.querySelector('.popup_type_new-card');
const placesList = document.querySelector('.places__list');
const imgPopUpType = document.querySelector('.popup_type_image');
const urlAvatar = `url('${avatar}')`;
const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = urlAvatar;
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const PopUpForm = editPopUp.querySelector('.popup__form').elements.name.value;

function editProfile() {
  editPopUp.querySelector('.popup__form').elements.name.value = profileTitle.textContent;
  editPopUp.querySelector('.popup__form').elements.description.value = profileDescription.textContent;
  togglePopUp(editPopUp)
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = PopUpForm;
  profileDescription.textContent = editPopUp.querySelector('.popup__form').elements.description.value;
  togglePopUp(editPopUp)
}

function openPopUpAdd(evt) {
  evt.preventDefault();
  const placeFields = addPopUp.querySelector('.popup__form').elements;
  const newCardInfo = {
    name: placeFields['place-name'].value,
    link: placeFields['link'].value
  };
  const newCard = cardElement.createCard(newCardInfo, cardElement.deleteCard, cardElement.likeCard, openPopUpImg);
  placesList.prepend(newCard);
  placeFields['place-name'].value = '';
  placeFields['link'].value = '';
  togglePopUp(addPopUp)
}

function openPopUpImg(evt) {
  imgPopUpType.querySelector('.popup__image').src = evt.link;
  imgPopUpType.querySelector('.popup__image').alt = evt.name;
  imgPopUpType.querySelector('.popup__caption').textContent = evt.name;
  togglePopUp(imgPopUpType)
}

function showInitialCards() {
  initialCards.forEach(element => {
  const card = cardElement.createCard(element, cardElement.deleteCard, cardElement.likeCard, openPopUpImg);
  placesList.append(card)
})
}

function initial() {
  showInitialCards();
  document.querySelectorAll('.popup').forEach(element => element.classList.add('popup_is-animated'));
  profileEditButton.addEventListener('click', editProfile);
  editPopUp.querySelector('.popup__form').addEventListener('submit', handleProfileFormSubmit);
  editPopUp.querySelector('.popup__close').addEventListener('click', () => togglePopUp(editPopUp));
  editPopUp.addEventListener('click', pressOverlay);
  addCardButton.addEventListener('click', () => togglePopUp(addPopUp));
  addPopUp.querySelector('.popup__form').addEventListener('submit', openPopUpAdd);
  addPopUp.querySelector('.popup__close').addEventListener('click', () => togglePopUp(addPopUp));
  addPopUp.addEventListener('click', pressOverlay);
  imgPopUpType.querySelector('.popup__close').addEventListener('click', () => togglePopUp(imgPopUpType));
  imgPopUpType.addEventListener('click', pressOverlay);
}
initial();