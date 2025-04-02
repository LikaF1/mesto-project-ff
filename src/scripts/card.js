export { createCard, handleLikeButtonClick, deleteCard };

function deleteCard(cardElement) {
  cardElement.remove();
}

const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  element,
  handleLikeButtonClick,
  ImageClickOpen,
  deleteCard
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;

  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  likeButton.addEventListener("click", (evt) => {
    handleLikeButtonClick(evt);
  });

  cardImage.addEventListener("click", () => ImageClickOpen(element));
  return cardElement;
}

function handleLikeButtonClick(event) {
  const likePlaced = event.target;
  likePlaced.classList.toggle("card__like-button_is-active");
}
