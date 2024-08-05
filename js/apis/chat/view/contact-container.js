class ContactContainer extends EasyEvents {
    _containerElement;

    constructor() {
        super()
        this._containerElement = this._createContainerElement();
        this._containerElement.addEventListener('click', () => this.triggerEvent('OPEN'));
        this.name = 'Sem nome'
    }

    // Method to create the container element for the contact
    _createContainerElement() {
        const container = document.createElement('div');
        container.className = 'contact-container';
        container.innerHTML = `
            <div>
                <a class="close waves-effect waves-teal">
                    <i class="material-icons">arrow_back</i>
                </a>
                <div class="circle white-text orange darken-4 first-letter">A</div>
            </div>
            <div>
                <span class="name">Alan Walker</span>
                <br>
                <b connection></b>
            </div>
            <div>
                <span class="new badge red unread-messages" data-badge-caption="novas" style="display:none"></span>
            </div>
        `;
        return container;


    }
    get closeButton(){
        return this._containerElement.querySelector('.close')
    }
    // Setter method to set the number of unread messages
    set unredMessages(unredMessages) {
        const badgeElement = this._containerElement.querySelector('.unread-messages');
        badgeElement.textContent = unredMessages;

        var displayValue = unredMessages == 0?'none':'inline-block'
        badgeElement.style.display = displayValue
    }

    // Setter method to set the name of the contact
    set name(name) {
        const nameElement = this._containerElement.querySelector('.name');
        nameElement.textContent = name;

        this.firstLetter = name[0]
    }

    // Setter method to set the first letter of the contact's name
    set firstLetter(letter) {
        const letterElement = this._containerElement.querySelector('.first-letter');
        letterElement.textContent = letter;
    }
    // Setter method to set the last time online (in seconds)
    set lastTimeOnline(time) {
        this._lastTimeOnline = time;
        this._updateConnectionStatus();
    }
    // Method to hide the unread messages badge
    hideUnreadMessages() {
        const badgeElement = this._containerElement.querySelector('.unread-messages');
        badgeElement.style.display = 'none';
    }
    //Not working properly.
    // Method to update the connection status based on lastTimeOnline
    _updateConnectionStatus() {
        const connectionElement = this._containerElement.querySelector('[connection]');
        const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Current time in seconds
        const lastTimeOnlineInSeconds = this._lastTimeOnline; // Last time online in seconds

        const timeDifferenceSeconds = currentTimeInSeconds - lastTimeOnlineInSeconds;

        const connection = timeDifferenceSeconds > 30 ? 'offline' : 'online';
        connectionElement.setAttribute('connection', connection);
    }
    // Getter method to retrieve the container element of the contact
    get containerElement() {
        return this._containerElement;
    }

}
/*
// Example usage
const contact = new ContactContainer();
contact.name = 'Alan Walker';
contact.firstLetter = 'A';
contact.unredMessages = 4;
contact.lastTimeOnline = new Date().getTime()
contact.on('OPEN', function() {
    debugger
})
// Append the contact container to the document body for demonstration
document.body.appendChild(contact.containerElement);*/