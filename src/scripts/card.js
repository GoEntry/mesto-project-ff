import { likeCardAPI, deleteCardAPI } from "./api"; 

// @todo: Темплейт карточки 
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card'); 

// @todo: Функция создания карточки 
function createCard(element, deleteCard, likeCard, openPopUp, userID) { 
  const cardElement = cardTemplate.cloneNode(true); 
  cardElement.querySelector('.card__title').textContent = element.name; 
  const cardImage = cardElement.querySelector('.card__image'); 
  cardImage.src = element.link; 
  cardImage.alt = element.name; 
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  const likeButton = cardElement.querySelector('.card__like-button'); 
  const countLike = cardElement.querySelector('.card__count-like'); 
  const likesArr = element.likes; 

  if (checkLikeById(userID, likesArr)) { 
    likeButton.classList.add('card__like-button_is-active'); 
  } 
  if (element.owner._id !== userID) {
    deleteButton.classList.add('hidden_button'); 
  } 

  countLike.textContent = likesArr.length; 
  deleteButton.addEventListener('click', () => deleteCard(cardElement, element._id)); 
  likeButton.addEventListener('click', () => likeCard(likeButton, countLike, element._id)); 
  cardImage.addEventListener('click', () => openPopUp({ name: element.name, link: element.link })); 
  return cardElement; 
} 

// @todo: Функция удаления карточки 
function deleteCard(cardElement, cardId) { 
  deleteCardAPI(cardId) 
    .then(response => { 
      if (response.flag) { 
        cardElement.remove(); 
      } 
    }) 
    .catch((err) => { 
      console.log(err); 
    }); 
} 

// @todo: Функция лайка карточки 
function likeCard(likeButton, countLike, cardId) { 
  if (likeButton.classList.contains('card__like-button_is-active')) { 
    likeCardAPI(cardId, "DELETE") 
      .then(res => { 
        const likes = res.likes; 
        countLike.textContent = likes.length; 
        likeButton.classList.toggle('card__like-button_is-active'); 
      }) 
      .catch((err) => { 
        console.log(err); 
      }); 
  } else { 
    likeCardAPI(cardId, "PUT") 
      .then(res => { 
        const likes = res.likes; 
        countLike.textContent = likes.length; 
        likeButton.classList.toggle('card__like-button_is-active'); 
      }) 
      .catch((err) => { 
        console.log(err); 
      }); 
  } 
} 

function checkLikeById(id, arr) { 
  const idArr = arr.map(item => item._id); 
  return idArr.includes(id); 
} 

export { createCard, deleteCard, likeCard };
