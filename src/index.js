import { initialCards } from './scripts/cards'; 
import './pages/index.css';
import logo from './images/logo.svg';
import avatar from './images/avatar.jpg'; 
import { openModal, closeModal} from "./scripts/open";
import { createCard, handleLikeButtonClick, deleteCard } from "./scripts/CardFunction";

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

const header = document.querySelector('.header');
const imgHeader= document.createElement('img');
imgHeader.src = logo; 
imgHeader.alt = 'Логотип проекта масто';
imgHeader.classList.add('logo', 'header__logo');
header.appendChild(imgHeader);
const popups = document.querySelectorAll(".popup");

// Находим элементы для редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const closeButton = popupEdit.querySelector('.popup__close');
const formElement = popupEdit.querySelector('.popup__form'); 
const nameInput = popupEdit.querySelector('.popup__input_type_name'); 
const jobInput = popupEdit.querySelector('.popup__input_type_description'); 
const closeButtons = document.querySelectorAll(".popup__close");

// Находим элементы для новой карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = popupNewCard.querySelector('.popup__form');
const cardNameInput = popupNewCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = popupNewCard.querySelector('.popup__input_type_url'); 
const placesList = document.querySelector('.places__list');

const addButton = document.querySelector('.profile__add-button'); 

// Функция для удаления карточки
//open img
// ,,,,,,,,,,,,,,,,,,

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

// ..................
document.addEventListener('click',ImageClickOpen)
// Создаем карточки из начальных данных
initialCards.forEach(cardData => {
    //zdes
    const cardElement = createCard(cardData, handleLikeButtonClick, ImageClickOpen);
    placesList.appendChild(cardElement);
});



const image = document.querySelector(".popup_type_image");
const imagePopup = document.querySelector(".popup__image");
const captionPopup = document.querySelector(".popup__caption");

function openImage(cardData) {
  imagePopup.src = cardData.link;
  imagePopup.alt = cardData.name;
  captionPopup.textContent = cardData.name;

  openModal(image);
}
// Функция для открытия/закрытия модального окна
function togglePopup(popup, isOpen) {
    popup.style.display = isOpen ? 'block' : 'none'; 
    if (isOpen) {
        document.addEventListener('keydown', handleEscClose);
        popup.addEventListener('click', handleOverlayClose);
    } else {
        document.removeEventListener('keydown', handleEscClose);
        popup.removeEventListener('click', handleOverlayClose);
    }
}

// Обработчик нажатия клавиши Esc
function handleEscClose(event) {
    if (event.key === 'Escape') {
        togglePopup(popupEdit, false);
        togglePopup(popupNewCard, false);
    }
}

// Обработчик клика по оверлею
function handleOverlayClose(event) {
    if (event.target === popupEdit || event.target === popupNewCard) {
        togglePopup(popupEdit, false);
        togglePopup(popupNewCard, false);
    }
}

// Обработчик клика по кнопке «Редактировать»
editButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
    // togglePopup(popupEdit, true);
    openModal(popupEdit);

});

// Обработчик клика по кнопке закрытия
closeButton.addEventListener('click', () => {
    togglePopup(popupEdit, false);
});

// Обработчик «отправки» формы редактирования профиля
formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    togglePopup(popupEdit, false);
});

// Обработчик клика по кнопке «+»

addButton.addEventListener('click', () => {
    togglePopup(popupNewCard, true);
});

// Обработчик «отправки» формы новой карточки
// formNewCard.addEventListener('submit', (evt) => {
//     evt.preventDefault(); // Отменяем стандартное поведение формы
//     // cardNameInput =
//     // cardLinkInput = 
//     // Получаем значения полей
//     initialCards.unshift({
//         name: cardNameInput.value,
//         link: cardLinkInput.value
//     });
//     // const link
//      createCard(formNewCard) ;
// })
formNewCard.addEventListener('submit', (evt) => {
    evt.preventDefault(); // Отменяем стандартное поведение формы

    // Получаем значения полей
    const newCardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };

    // Добавляем данные в начало массива
    initialCards.unshift(newCardData);

    // Создаем новую карточку и добавляем её в DOM
    const newCardElement = createCard(newCardData);
    placesList.prepend(newCardElement);

    // Закрываем модальное окно
    togglePopup(popupNewCard, false);

    // Очищаем форму
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
  