const initialCards = [{
	name: 'Уффф, кефтеме',
	link: 'https://plus.unsplash.com/premium_photo-1695239201521-49524a277499?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}, {
	name: 'Девушка с иероглифами',
	link: 'https://images.unsplash.com/photo-1694939200168-1eab019da48d?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}, {
	name: 'Солнце, море, жара',
	link: 'https://images.unsplash.com/photo-1698402532179-990fb9832878?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}, {
	name: 'Пустыня кайфа',
	link: 'https://images.unsplash.com/photo-1693753310466-bd53501ba2a9?auto=format&fit=crop&q=80&w=1893&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}, {
	name: 'Вези меня олень.. В свою страну..',
	link: 'https://images.unsplash.com/photo-1698970992928-102b3f3cea9a?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}, {
	name: '2024',
	link: 'https://images.unsplash.com/photo-1702274397667-14596faf1cd1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}];
import {
	openFullImage,
	popupNewCard
} from "./modals";
import {
	deleteCard,
	putLike,
	deleteLike
} from "./api";
const placesList = document.querySelector(".places__list");

export {
	createCard,
	deleteMyCard,
	likeCard,
	placesList
};

function createCard(cards, userId, deleteMyCard, openFullImage, likeCard) {
	const cardTemplate = document.querySelector("#card-template").content;
	const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
	const cardTitle = cardElement.querySelector('.card__title');
	const cardImage = cardElement.querySelector('.card__image');
	const cardDeleteButton = cardElement.querySelector('.card__delete-button');
	const likeButton = cardElement.querySelector('.card__like-button');
	const cardLikeCount = cardElement.querySelector(".card__like-count");
	cardTitle.textContent = cards.name;
	cardImage.src = cards.link;
	cardImage.alt = cards.name;
	cardLikeCount.textContent = cards.likes.length;
	cardImage.addEventListener('click', openFullImage);
	cardElement.id = cards["_id"];

	if(cards.owner["_id"] === userId) {
		cardDeleteButton.addEventListener("click", () => {
			deleteMyCard(cardElement.id, cardElement);
		});
		
	} else {cardDeleteButton.remove();
		console.log("test1")
	}

	const checkLike = cards.likes.some((like) => like._id === userId);
	if(checkLike) {
		likeButton.classList.add('card__like-button_is-active')
	}
	likeButton.addEventListener('click', (evt) => {
		likeCard(evt, cards._id, cardLikeCount)
	});
	return cardElement;
}



function deleteMyCard(cardId, cardElement) {
	deleteCard(cardId).then(() => {
		cardElement.remove();
	}).catch((err) => {
		console.log(err)
	});
};

function likeCard(evt, cardId, cardLikeCount) {
	if(evt.target.classList.contains('card__like-button_is-active')) {
		deleteLike(cardId).then((card) => {
			evt.target.classList.remove('card__like-button_is-active');
			cardLikeCount.textContent = card.likes.length;
		}).catch((error) => console.log("ошибка", error));
	} else {
		putLike(cardId).then((card) => {
			evt.target.classList.add('card__like-button_is-active');
			cardLikeCount.textContent = card.likes.length;
		}).catch((error) => console.log("ошибка", error));
	}
};