import '../index.css';
import {
	initialCards,
	deleteMyCard,
	createCard,
	likeCard,
	placesList
} from './cards';
import {
	openModal,
	closeModal,
	handleProfileFormSubmit,
	handleNewCardAdd,
	openFullImage,
	inputTitle,
	inputDescription,
	profileDescription,
	profileTitle,
	popupNewCard
} from './modals';
import {
	enableValidation,
	clearValidation,
	validationConfig
} from './validation';
import {
	getUserData,
	getInitialCards,
	editAvatar,
	editUserDataset
} from './api'
export {
	buttonEditProfile,
	popupEditProfile,
	newCardForm,
	buttonNewCard
};
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonNewCard = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const profileForm = document.forms['edit-profile'];
const newCardForm = document.forms['new-place'];
const popupAvatarForm = document.forms['edit-avatar'];
const popupAvatar = document.querySelector('.popup_type_avatar');
const profileImage = document.querySelector(".profile__image");
const avatarEditButton = document.querySelector('.profile__container');
const saveAvatar = popupAvatar.querySelector('.popup__button');
export let userId = '';
enableValidation(validationConfig);
Promise.all([getUserData(), getInitialCards()]).then(([profileData, cardsData]) => {
	profileTitle.textContent = profileData.name;
	profileDescription.textContent = profileData.about;
	profileImage.style.backgroundImage = `url(\\${profileData.avatar})`;
	userId = profileData._id;
	cardsData.forEach((cards) => {
		placesList.append(createCard(cards, userId, deleteMyCard, openFullImage, likeCard));
	});
}).catch((error) => console.log("ошибка / promise:", error));
closeButtons.forEach((butClose) => {
	butClose.addEventListener('click', closeModal);
})
buttonEditProfile.addEventListener('click', function() {
	inputTitle.value = profileTitle.textContent;
	inputDescription.value = profileDescription.textContent;
	clearValidation(popupEditProfile, validationConfig);
	openModal(popupEditProfile)
})
buttonNewCard.addEventListener('click', function() {
	clearValidation(popupNewCard, validationConfig);
	openModal(popupNewCard);
})
avatarEditButton.addEventListener("click", function() {
	popupAvatarForm.reset();
	clearValidation(popupAvatar, validationConfig);
	openModal(popupAvatar);
});

function handleAvatarFormSubmit(evt) {
	saveAvatar.textContent = saveAvatar.getAttribute('data-load');
	evt.preventDefault();
	editAvatar(popupAvatarForm.link.value).then((profileData) => { 
		profileImage.style.backgroundImage = `url(\\${profileData.avatar})`;  
		closeModal(popupAvatar);
	}).catch((error) => console.log("ошибка", error)).finally(() => (saveAvatar.textContent = saveAvatar.getAttribute('data-text')));
	clearValidation(popupAvatarForm, validationConfig);
}
popupAvatarForm.addEventListener('submit', handleAvatarFormSubmit)
profileForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleNewCardAdd);