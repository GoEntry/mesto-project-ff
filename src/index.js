import './pages/index.css';
import { togglePopUp, pressOverlay } from "./scripts/modal";
import * as cardElement from "./scripts/card";
import { getUser, getCardArr, patchUserApi, addCardApi, changeAvatarApi } from "./scripts/api";
import { enableValidation, clearValidation, toggleButtonState } from "./scripts/validation";

const editPopUp = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const addPopUp = document.querySelector('.popup_type_new-card');
const placesList = document.querySelector('.places__list');
const imgPopUpType = document.querySelector('.popup_type_image');
const profileImage = document.querySelector('.profile__image');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const editProfileForm = editPopUp.querySelector('.popup__form');

const editAvatarPopUp = document.querySelector('.popup_change-avatar');
const editAvatarForm = editAvatarPopUp.querySelector('.popup__form');
const avatarField = editAvatarForm.elements.url;
const buttonAvatarClose = editAvatarPopUp.querySelector('.popup__close');
const buttonAvatarSave = editAvatarPopUp.querySelector('.popup__button');
const buttonProfileSave = editPopUp.querySelector('.popup__button');
const buttonNewCardSave = addPopUp.querySelector('.popup__button');

const validData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  errorClass: 'popup__input_type_error',
  spanErrorClass: 'popup__error_visible'
};

function editProfile() {
  clearValidation(editPopUp, validData);
  editProfileForm.elements.name.value = profileTitle.textContent;
  editProfileForm.elements.description.value = profileDescription.textContent;
  toggleButtonState(editProfileForm, validData);
  togglePopUp(editPopUp);
}

function clickEditAvatar() {
  clearValidation(editAvatarPopUp, validData);
  toggleButtonState(editAvatarForm, validData);
  togglePopUp(editAvatarPopUp);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  buttonProfileSave.textContent = 'Сохранение...';
  patchUserApi(editProfileForm.elements.name.value, editProfileForm.elements.description.value)
    .then(response => {
      if (response.flag) {
        profileTitle.textContent = response.user.name;
        profileDescription.textContent = response.user.about;
        togglePopUp(editPopUp);
      }
    })
    .catch(err => console.log(err))
    .finally(() => { buttonProfileSave.textContent = 'Сохранить'; });
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  buttonAvatarSave.textContent = 'Сохранение...';
  changeAvatarApi(avatarField.value)
    .then(response => {
      if (response.flag) {
        profileImage.style.backgroundImage = `url('${response.user.avatar}')`;
        togglePopUp(editAvatarPopUp);
        avatarField.value = '';
      }
    })
    .catch(err => console.log(err))
    .finally(() => { buttonAvatarSave.textContent = 'Сохранить'; });
}

function handleAddCard(evt, userId) {
  evt.preventDefault();
  const placeFields = addPopUp.querySelector('.popup__form').elements;
  const newCardData = {
    name: placeFields['place-name'].value,
    link: placeFields['link'].value
  };
  buttonNewCardSave.textContent = 'Сохранение...';
  addCardApi(newCardData)
    .then(response => {
      if (response.flag) {
        const newCard = cardElement.createCard(response.card, cardElement.deleteCard, cardElement.likeCard, openPopUpImg, userId);
        placesList.prepend(newCard);
        togglePopUp(addPopUp);
        addPopUp.querySelector('.popup__form').reset();
      }
    })
    .catch(err => console.log(err))
    .finally(() => { buttonNewCardSave.textContent = 'Сохранить'; });
}

function openPopUpImg(data) {
  const image = imgPopUpType.querySelector('.popup__image');
  const caption = imgPopUpType.querySelector('.popup__caption');
  image.src = data.link;
  image.alt = data.name;
  caption.textContent = data.name;
  togglePopUp(imgPopUpType);
}

function showCards(dataArr, userId) {
  dataArr.forEach(element => {
    const card = cardElement.createCard(element, cardElement.deleteCard, cardElement.likeCard, openPopUpImg, userId);
    placesList.append(card);
  });
}

function initialUser(user) {
  profileImage.style.backgroundImage = `url('${user.avatar}')`;
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
}

function clickAddNewCard() {
  clearValidation(addPopUp, validData);
  toggleButtonState(addPopUp.querySelector('.popup__form'), validData);
  togglePopUp(addPopUp);
}

function initial() {
  Promise.all([getUser(), getCardArr()])
    .then(([user, initialCardList]) => {
      const userId = user._id;

      initialUser(user);
      showCards(initialCardList, userId);

      document.querySelectorAll('.popup').forEach(el => el.classList.add('popup_is-animated'));

      profileImage.addEventListener('click', clickEditAvatar);
      buttonAvatarClose.addEventListener('click', () => togglePopUp(editAvatarPopUp));
      editAvatarForm.addEventListener('submit', handleEditAvatarFormSubmit);
      editAvatarPopUp.addEventListener('click', pressOverlay);

      profileEditButton.addEventListener('click', editProfile);
      editProfileForm.addEventListener('submit', handleProfileFormSubmit);
      editPopUp.querySelector('.popup__close').addEventListener('click', () => togglePopUp(editPopUp));
      editPopUp.addEventListener('click', pressOverlay);

      addCardButton.addEventListener('click', clickAddNewCard);
      addPopUp.querySelector('.popup__form').addEventListener('submit', (evt) => handleAddCard(evt, userId));
      addPopUp.querySelector('.popup__close').addEventListener('click', () => togglePopUp(addPopUp));
      addPopUp.addEventListener('click', pressOverlay);

      imgPopUpType.querySelector('.popup__close').addEventListener('click', () => togglePopUp(imgPopUpType));
      imgPopUpType.addEventListener('click', pressOverlay);

      enableValidation(validData);
    })
    .catch(err => console.log(err));
}

initial();
