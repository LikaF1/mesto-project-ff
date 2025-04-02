import { initialCards } from "./scripts/cards";
import "./pages/index.css";
import logo from "./images/logo.svg";
import avatar from "./images/avatar.jpg";
import { openModal, closeModal } from "./scripts/modal";
import { createCard, handleLikeButtonClick, deleteCard } from "./scripts/card";

const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${avatar})`;
const header = document.querySelector(".header");
const imgHeader = document.createElement("img");
imgHeader.src = logo;
imgHeader.alt = "Логотип проекта масто";
imgHeader.classList.add("logo", "header__logo");
header.appendChild(imgHeader);
const popups = document.querySelectorAll(".popup");
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const closeButton = popupEdit.querySelector(".popup__close");
const formElement = popupEdit.querySelector(".popup__form");
const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_description");
const closeButtons = document.querySelectorAll(".popup__close");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formNewCard = popupNewCard.querySelector(".popup__form");
const cardNameInput = popupNewCard.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = popupNewCard.querySelector(".popup__input_type_url");
const placesList = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const image = document.querySelector(".popup_type_image");
const imagePopup = document.querySelector(".popup__image");
const captionPopup = document.querySelector(".popup__caption");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
});

closeButtons.forEach((item) => {
  const modal = item.closest(".popup");
  item.addEventListener("click", () => {
    closeModal(modal);
  });
});

initialCards.forEach((element) => {
  const newCard = createCard(
    element,
    handleLikeButtonClick,
    ImageClickOpen,
    deleteCard
  );
  placesList.appendChild(newCard);
});

function ImageClickOpen(cardData) {
  imagePopup.src = cardData.link;
  imagePopup.alt = cardData.name;
  captionPopup.textContent = cardData.name;
  openModal(image);
}

editButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  openModal(popupEdit);
});

closeButton.addEventListener("click", () => {
  closeModal(popupEdit);
});

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  openModal(popupEdit);
});

addButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  openModal(popupNewCard);
});

formNewCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  const newCardData = {
    name: cardName,
    link: cardLink,
  };

  initialCards.unshift(newCardData);
  const newCardElement = createCard(
    newCardData,
    handleLikeButtonClick,
    ImageClickOpen,
    deleteCard
  );
  placesList.prepend(newCardElement);
  openModal(popupNewCard);
  formNewCard.reset();
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
});

closeButtons.forEach((item) => {
  const modal = item.closest(".popup");
  item.addEventListener("click", () => {
    closeModal(modal);
  });
});
