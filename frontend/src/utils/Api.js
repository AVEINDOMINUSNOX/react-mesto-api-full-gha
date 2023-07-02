class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
    //this.token = config.token;
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
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
      method: "GET",
    }).then(this._handleResponse);
  }

  // Cохраняем данные пользователя
  saveUserInfo(name, about) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleResponse);
  }

  // Сохраняем Аватар
  saveAvatar(avatar) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._handleResponse);
  }

  //Фотокарточки
  // Получаем список фотокарточек
  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
      method: "GET",
    }).then(this._handleResponse);
  }  

  postCard(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      headers: this.headers,
      method: "DELETE",
    }).then(this._handleResponse);
  }

  setLikeCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
      method: "PUT",
    }).then(this._handleResponse);
  }

  deleteLikeCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
      method: "DELETE",
    }).then(this._handleResponse);
  }

  selectLikeStatus(cardId, isLiked) {
    if (!isLiked) return this.deleteLikeCard(cardId);
    else return this.setLikeCard(cardId);
  }
}

const api = new Api({
  url: "http://localhost:3000",
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": 'application/json'
  },
});

export default api;
