/* export const BASE_URL = "http://localhost:3000"; */
export const BASE_URL = "https://mesto.aveindominusnox.nomoreparties.sbs";

export class Auth {
  handleError(err) {
    if (err.message) {
      return err.message;
    } else if (err) {
      return err.error;
    } else {
      return "";
    }
  }

  // функция обработки результата ответа сервера
  async _handleResponse(response, errorMessage, message400, message401) {
    try {
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      if (response.status === 400) {
        throw new Error(message400);
      } else if (response.status === 401) {
        throw new Error(message401);
      }
      const message = this.handleError(data);
      throw new Error(message);
    } catch (error) {
      throw new Error(`${errorMessage} : ${error.message}`);
    }
  }

  async signin(email, password) {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });

    return this._handleResponse(
      response,
      "Не удалось войти",
      "не передано одно из полей",
      "email не зарегистрирован"
    );
  }

  async signup(email, password) {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });

    return this._handleResponse(
      response,
      "Регистрация не была успешно завершена",
      "пользователь с таким email уже зарегистрирован"
    );
  }

  async checkUserSession(token) {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return this._handleResponse(
      response,
      "Данные токена не были успешно обработаны сервером",
      " Токен не передан или передан не в том формате",
      "Переданный токен некорректен"
    );
  }
}
const auth = new Auth();
export default auth;
