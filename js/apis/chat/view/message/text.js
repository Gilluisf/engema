class TextMessageCard extends MessageCard {
    // Constructor to create a new TextMessageCard instance
    constructor() {
        super(); // Call the constructor of the parent class (MessageCard)
        
        // Add a blank <p> tag to the container element
        const paragraph = document.createElement('p');
        this._containerElement.insertAdjacentElement('afterbegin',paragraph);
    }

    // Setter method to set the text of the message card
    set text(text) {
        const paragraph = this._containerElement.querySelector('p');
        paragraph.textContent = text;
    }
    
    // Getter method to retrieve the text of the message card
    get text() {
        const paragraph = this._containerElement.querySelector('p');
        return paragraph.textContent;
    }
}
/*
// Example usage
const textMessageCard = new TextMessageCard();
textMessageCard.date = Date.now();
textMessageCard.from = 'sender';
textMessageCard.text = 'This is a text message.';
document.body.appendChild(textMessageCard.containerElement);

textMessageCard.on('READ', () => {
    console.log('Text message has been read.');
    ///textMessageCard.unread = false;
});

textMessageCard.containerElement.focus();
*/