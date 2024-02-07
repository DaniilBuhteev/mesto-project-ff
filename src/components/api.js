const config = {
	baseUrl: "https://nomoreparties.co/v1/wff-cohort-3",
	headers: {
		authorization: "82e75dd4-103a-412c-8c2f-4aa76a1c1ac8",
		"Content-Type": "application/json",
	},
};
//тест коннекта
const connect = (res) => {
	return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};
//инфа профиля
const getUserData = () => {
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers,
	}).then((res) => connect(res));
};
// инфа карточек
const getInitialCards = () => {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	}).then((res) => connect(res));
};
const editUserDataset = (profileTitle, profileDescription) => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: "PATCH",
		headers: config.headers,
		body: JSON.stringify({
			name: profileTitle,
			about: profileDescription
		}),
	}).then((res) => connect(res));
};

function addCard(name, link) {
	return fetch(`${config.baseUrl}/cards`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			link: link,
		}),
	}).then((res) => connect(res));
}

function deleteCard(cardId) {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: "DELETE",
		headers: config.headers,
	}).then((res) => connect(res));
}
const putLike = async(cardId) => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "PUT",
		headers: config.headers,
	}).then((res) => connect(res));
};
const deleteLike = async(cardId) => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "DELETE",
		headers: config.headers,
	}).then((res) => connect(res));
};
const editAvatar = async(avatarLink) => {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: "PATCH",
		headers: config.headers,
		body: JSON.stringify({
			avatar: avatarLink,
		}),
	}).then((res) => connect(res));
};
export {
	getUserData,
	getInitialCards,
	editUserDataset,
	addCard,
	deleteCard,
	putLike,
	deleteLike,
	editAvatar
};