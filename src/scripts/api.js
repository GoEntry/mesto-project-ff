const config = {
  baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
  headers: {
    authorization: '046e5a07-c01d-4e0d-b73a-d035926bcc3d',
    'Content-Type': 'application/json'
  }
};

const apiRequest = (url, options = {}) => {
  return fetch(`${config.baseUrl}${url}`, {
    ...options,
    headers: {
      ...config.headers,
      ...options.headers
    }
  })
    .then(res => getResponseData(res));
};

export const getUser = () => {
  return apiRequest('/users/me')
    .then(result => ({
      _id: result._id,
      name: result.name,
      about: result.about,
      avatar: result.avatar,
      cohort: result.cohort
    }));
};

export const patchUserApi = (name, about) => {
  return apiRequest('/users/me', {
    method: 'PATCH',
    body: JSON.stringify({ name, about })
  })
    .then(user => ({ user, flag: true }));
};

export const getCardArr = () => {
  return apiRequest('/cards');
};

export const addCardApi = (card) => {
  return apiRequest('/cards', {
    method: 'POST',
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
    .then(card => ({ card, flag: true }));
};

export const likeCardAPI = (id, method) => {
  return apiRequest(`/cards/likes/${id}`, { method });
};

export const deleteCardAPI = (id) => {
  return apiRequest(`/cards/${id}`, { method: 'DELETE' })
    .then(result => ({ result, flag: true }));
};

export const changeAvatarApi = (url) => {
  return apiRequest('/users/me/avatar', {
    method: 'PATCH',
    body: JSON.stringify({ avatar: url })
  })
    .then(user => ({ user, flag: true }));
};

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
}
