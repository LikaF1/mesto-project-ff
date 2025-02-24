export { openModal, closeModal, ImageClickOpen}

// const image = document.querySelector('.popup_type_image');
// const imgPopup = document.querySelector('.popup__image');
// const PopupCaptin = document.querySelector('.popup__caption');
function openModal(popup){
    document.addEventListener('keydown', closeByEscape)
    popup.classList.add('popup_is-opened') 
}
function closeModal(popup){
    document.removeEventListener('keydown', closeByEscape)
    popup.classList.remove('popup_is-opened')
  }
  function closeByEscape(event) {
    if(event.key === 'Escape') {
       closeModal(document.querySelector('.popup_is-opened'));
    }
  }
// function ImageClickOpen(cardData){
//     imgPopup.src=cardData.link;
//     imgPopup.alt=cardData.name;
//     PopupCaptin.textContent=cardData.name;
//     openModal(image)

// }