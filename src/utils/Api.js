const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VkNTI3NzU5Yjk4YjAzOGY3N2I2N2YiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2NDk3ODAxLCJleHAiOjE3MDgwMzM4MDF9.gjSdw_j_fZ_OwrOcZP3oPyk2TPeHvN76u5Nltk1xeg4'
    },
};

const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getProductList() {
        return fetch(`${this._baseUrl}/products`, {
            headers: this._headers,
        }).then(onResponse);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then((res) => onResponse(res));
    }

    searchProducts(query) {
        return fetch(`${this._baseUrl}/products/search?query=${query}`, {
            headers: this._headers,
        }).then((res) => onResponse(res));
    }

    changeLikeProductStatus(productId, like) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
            headers: this._headers,
            method: like ? 'DELETE' : 'PUT',
        }).then((res) => onResponse(res));
    }
    getProduct(productId) {
        return fetch(`${this._baseUrl}/products/${productId}`, {
            headers: this._headers,
            method: 'GET'
        }).then((res) => onResponse(res));
    }
    createProduct() {
        return fetch(`${this._baseUrl}/products`, {
            headers: this._headers,
            method: 'POST'
        }).then((res) => onResponse(res));
    }
    changeProduct(productId) {
        return fetch(`${this._baseUrl}/products/${productId}`, {
            headers: this._headers,
            method: 'PATCH'
        }).then((res) => onResponse(res));
    }
    deleteProduct(productId) {
        return fetch(`${this._baseUrl}/products/${productId}`, {
            headers: this._headers,
            method: 'DELETE'
        }).then((res) => onResponse(res));
    }
    commentProduct(productId) {
        return fetch(`${this._baseUrl}/products/review/${productId}`, {
            headers: this._headers,
            method: 'POST'
        }).then((res) => onResponse(res));
    }
    deleteCommentProduct(productId, reviewId) {
        return fetch(`${this._baseUrl}/products/review/${productId}/${reviewId}`, {
            headers: this._headers,
            method: 'DELETE'
        }).then((res) => onResponse(res));
    }
    getAllCommentProducts() {
        return fetch(`${this._baseUrl}/products/`, {
            headers: this._headers,
            method: 'GET'
        }).then((res) => onResponse(res));
    }
    getCommentProduct(productId) {
        return fetch(`${this._baseUrl}/products/review/${productId}`, {
            headers: this._headers,
            method: 'GET'
        }).then((res) => onResponse(res));
    }
}


export const api = new Api(config);

