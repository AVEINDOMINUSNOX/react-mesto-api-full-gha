class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
    this.token = config.token;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  };

  //Пользователь
  //Получаем инф-ию о пользователе
  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
      method: "GET",
    }).then(this._handleResponse);
  }

  // Cохраняем данные пользователя
  saveUserInfo(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleResponse);
  }

  // Сохраняем Аватар
  saveAvatar(avatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._handleResponse);
  }

  //Фотокарточки
  // Получаем список фотокарточек
  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
      method: "GET",
    }).then(this._handleResponse);
  }

  postCard(data) {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then(this._handleResponse);
  }

  setLikeCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then(this._handleResponse);
  }

  deleteLikeCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then(this._handleResponse);
  }

  /*   selectLikeStatus(cardId, isLiked) {
    if (!isLiked) return this.deleteLikeCard(cardId);
    else return this.setLikeCard(cardId);
  } */

  selectLikeStatus(cardId, liked) {
    if (!liked) return this.deleteLikeCard(cardId); 
    else return this.setLikeCard(cardId);
  } 
}

const api = new Api({
   url: "http://localhost:3000", 
 /*  url: "https://mesto.aveindominusnox.nomoreparties.sbs", */
  token: `Bearer ${localStorage.getItem("token")}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export default api;
