// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (element, deleteCard, likeCard, openPopUp) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = element.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = element.link;
  cardImage.alt = element.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', (evt) => deleteCard(cardElement));
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', (evt) => likeCard(likeButton));
  const name = element.name;
  const link = element.link;
  cardImage.addEventListener('click', (evt) => openPopUp({name, link}));
  return cardElement
}

// @todo: Функция удаления карточки
function deleteCard (card) {
  card.remove();
}

function likeCard(like) {
  like.classList.toggle('card__like-button_is-active')
}

// @todo: Вывести карточки на страницу
/*function showInitialCards() {
  initialCards.forEach((element) => {
    placesList.append(createCard(element, deleteCard));
  });
}
*/
export {createCard, deleteCard, likeCard}