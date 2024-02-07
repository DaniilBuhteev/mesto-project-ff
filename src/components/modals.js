import {
	createCard,
	deleteMyCard,
	likeCard,
	placesList
} from './cards';
import {
	editUserDataset,
	addCard
} from './api';
import {
	buttonEditProfile,
	popupEditProfile,
	newCardForm,
	buttonNewCard,
	userId
} from './index';
import {
	clearValidation,
	validationConfig
} from './validation';
const popups = document.querySelectorAll('.popup');
const inputTitle = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupNewCard = document.querySelector('.popup_type_new-card');
const imgNameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');
const saveProfile = document.querySelector('.popup__button');
const saveCard = popupNewCard.querySelector('.popup__button');
export {
	openModal,
	closeModal,
	handleProfileFormSubmit,
	openFullImage,
	handleNewCardAdd,
	inputTitle,
	inputDescription,
	profileDescription,
	profileTitle,
	popups,
	popupTypeImage,
	popupImage,
	popupCaption,
	popupNewCard,
	imgNameInput,
	linkInput
};

function openModal(pop) {
	pop.classList.add("popup_is-animated");
	setTimeout(() => {
		pop.classList.add("popup_is-opened");
	}, 1);
	document.addEventListener('keydown', closeByEsc);
	pop.addEventListener('click', closeByOverley);
}

function closeModal() {
	popups.forEach(pop => {
		if(pop.classList.contains('popup_is-opened')) {
			pop.classList.remove("popup_is-opened");
			setTimeout(() => {
				pop.classList.remove("popup_is-animated");
			}, 600);
			document.removeEventListener('keydown', closeByEsc);
			pop.removeEventListener('click', closeByOverley);
		} else return null;
	})
}

function closeByEsc(evt) {
	if(evt.key === 'Escape') {
		closeModal(document.querySelector('.popup_is-opened'))
	}
}

function closeByOverley(event) {
	if(event.target.classList.contains('popup_is-opened')) {
		closeModal(event.currentTarget);
	}
}

function handleProfileFormSubmit(evt) {
	evt.preventDefault();
	saveProfile.textContent = saveProfile.getAttribute('data-load');
	editUserDataset(inputTitle.value, inputDescription.value).then((profileData) => {
		profileTitle.textContent = profileData.name;
		profileDescription.textContent = profileData.about;
		closeModal(popupEditProfile);
	}).catch((error) => console.log("ошибка", error)).finally(() => (saveProfile.textContent = saveProfile.getAttribute('data-text')));
	clearValidation(popupEditProfile, validationConfig);
}

function openFullImage(evt) {
	popupImage.src = evt.target.src;
	popupImage.alt = evt.target.alt;
	popupCaption.textContent = evt.target.alt;
	openModal(popupTypeImage);
}

function handleNewCardAdd(evt) {
	evt.preventDefault();
	saveCard.textContent = saveCard.getAttribute('data-load');
	addCard(imgNameInput.value, linkInput.value).then((cards) => {
		const newCard = createCard(cards, userId, deleteMyCard, openFullImage, likeCard);
		placesList.prepend(newCard);
		closeModal(popupNewCard);
		evt.target.reset();
	}).catch((error) => console.log("ошибка", error)).finally(() => (saveCard.textContent = saveCard.getAttribute('data-text')));
	clearValidation(newCardForm, validationConfig);
}