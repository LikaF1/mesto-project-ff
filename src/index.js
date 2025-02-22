import { initialCards } from './scripts/cards'; 
import './pages/index.css';
import logo from './images/logo.svg';
import avatar from './images/avatar.jpg'; 

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

const header = document.querySelector('.header');
const img = document.createElement('img');
img.src = logo; 
img.alt = 'Логотип проекта масто';
img.classList.add('logo', 'header__logo');
header.appendChild(img);

const placesList = document.querySelector('.places__list');

// Функция для удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}
// ..........
function handleLikeButtonClick(event) {
    const likeButton = event.target;
    likeButton.classList.toggle('card__like-button_is-active');
}

// Функция для создания карточки
function createCard(cardData, handleLike, ImageClickOpen) {
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.cloneNode(true).firstElementChild;
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');


    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => {
        console.log('Удаление карточки:', cardElement);
        deleteCard(cardElement);
    });
    //zdes
    likeButton.addEventListener('click', handleLike);
    cardImage.addEventListener('click',() => ImageClickOpen(cardElement));
    return cardElement; 
}
const img = document.querySelector('.popup_type_image');
const imgPopup = document.querySelector('.popup__image');
const PopupCaptin = document.querySelector('.popup__caption');

function ImageClickOpen(event){
    imgPopup.src=event.target.src
    imgPopup.alt=event.target.alt
    PopupCaptin.textContent=event.target.alt
    openModal(img)

}
document.addEventListener('click',ImageClickOpen)
// Создаем карточки из начальных данных
initialCards.forEach(cardData => {
    //zdes
    const cardElement = createCard(cardData, handleLikeButtonClick, ImageClickOpen);
    placesList.appendChild(cardElement);
});


// Находим элементы для редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const closeButton = popupEdit.querySelector('.popup__close');
const formElement = popupEdit.querySelector('.popup__form'); 
const nameInput = popupEdit.querySelector('.popup__input_type_name'); 
const jobInput = popupEdit.querySelector('.popup__input_type_description'); 

// Находим элементы для новой карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = popupNewCard.querySelector('.popup__form');
const cardNameInput = popupNewCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = popupNewCard.querySelector('.popup__input_type_url'); 

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
editButton.addEventListener('click', () => {
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
    togglePopup(popupEdit, true);
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
const addButton = document.querySelector('.profile__add-button'); 

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

