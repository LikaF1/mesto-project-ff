
export { createCard, handleLikeButtonClick, deleteCard };

function deleteCard(cardElement) {
    cardElement.remove();
}
// ..........
function handleLikeButtonClick(event) {
    const likeButton = event.target;
    likeButton.classList.toggle('card__like-button_is-active');
}

// Функция для создания карточки
function createCard(cardData, handleLike, ImageClickOpen ) {
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
    cardImage.addEventListener('click',() => ImageClickOpen(cardData));
    return cardElement; 
}