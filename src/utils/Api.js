const freshHeaders = () => {
    return {
        headers: {
            "content-type": "application/json",
            Authorization: localStorage.getItem("token"),
        },
    };
};

const config = {
    baseUrl: "https://api.react-learning.ru",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    freshHeaders: freshHeaders,
  };
  

const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
    constructor(data) {
        this._baseUrl = data.baseUrl;
        this._headers = data.headers;
        this._freshHeaders = data.freshHeaders;
    }

    getProductList() {
        return fetch(`${this._baseUrl}/products`, {
            ...this._freshHeaders(),
        }).then(onResponse);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            ...this._freshHeaders(),
        }).then((res) => onResponse(res));
    }

    searchProducts(query) {
        return fetch(`${this._baseUrl}/products/search?query=${query}`, {
            ...this._freshHeaders(),
        }).then((res) => onResponse(res));
    }

    changeLikeProductStatus(productId, like) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
            ...this._freshHeaders(),
            method: like ? 'DELETE' : 'PUT',
        }).then((res) => onResponse(res));
    }
    getProduct(productId) {
        return fetch(`${this._baseUrl}/products/${productId}`, {
            ...this._freshHeaders(),
            method: 'GET'
        }).then((res) => onResponse(res));
    }
    createProduct() {
        return fetch(`${this._baseUrl}/products`, {
            ...this._freshHeaders(),
            method: 'POST'
        }).then((res) => onResponse(res));
    }
    changeProduct(productId) {
        return fetch(`${this._baseUrl}/products/${productId}`, {
            ...this._freshHeaders(),
            method: 'PATCH'
        }).then((res) => onResponse(res));
    }
    deleteProduct(productId) {
        return fetch(`${this._baseUrl}/products/${productId}`, {
            ...this._freshHeaders(),
            method: 'DELETE'
        }).then((res) => onResponse(res));
    }
    commentProduct(productId) {
        return fetch(`${this._baseUrl}/products/review/${productId}`, {
            ...this._freshHeaders(),
            method: 'POST'
        }).then((res) => onResponse(res));
    }
    deleteCommentProduct(productId, reviewId) {
        return fetch(`${this._baseUrl}/products/review/${productId}/${reviewId}`, {
            ...this._freshHeaders(),
            method: 'DELETE'
        }).then((res) => onResponse(res));
    }
    getAllCommentProducts() {
        return fetch(`${this._baseUrl}/products/`, {
            ...this._freshHeaders(),
            method: 'GET'
        }).then((res) => onResponse(res));
    }
    getCommentProduct(productId) {
        return fetch(`${this._baseUrl}/products/review/${productId}`, {
            ...this._freshHeaders(),
            method: 'GET'
        }).then((res) => onResponse(res));
    }
}


export const api = new Api(config);

