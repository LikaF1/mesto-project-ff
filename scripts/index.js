function deleteCard(cardElement) {
    cardElement.remove();
}

function createCard(cardData, onDelete) {
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.cloneNode(true).firstElementChild;
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    
    deleteButton.addEventListener('click', () => {
        console.log('Удаление карточки:', cardElement);
        onDelete(cardElement);
    });
    
    return cardElement; 
}

const placesList = document.querySelector('.places__list');

for (let i = 0; i < initialCards.length; i++) {
    const cardElement = createCard(initialCards[i], deleteCard);
    placesList.appendChild(cardElement);
}
