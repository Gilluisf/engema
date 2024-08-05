class MessageCard extends EasyEvents {
    // Private variable to store the container element of the message card
    _containerElement;
    _from
    unread = true; // Initialize unread attribute to true
    _interval
    // Constructor to create a new MessageCard instance
    constructor() {
        super();
        this._containerElement = this._createContainerElement();
        
        this.listenRead()
        
    }

    listenRead(){
        this._interval = setInterval(() => {
            if(this.isInViewport && this._containerElement.checkVisibility() && this.unread){

                clearInterval(this._interval)
                this.unread = false
                this.triggerEvent('READ');

            } else {

            }
        }, 500)             
    }

    // Method to create the container element for the message card
    _createContainerElement() {
        const container = document.createElement('div');
        container.className = 'message';
        //container.tabIndex = 0; // Make it focusable

        container.innerHTML = `<span class="timestamp"></span>`;

        return container;
    }
    get isInViewport() {
        const rect = this._containerElement.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
   
    // Getter method to retrieve the timestamp element of the message card
    get timestampElement() {
        return this._containerElement.querySelector('.timestamp');
    }

    // Setter method to set the date of the message card
    set timestamp(date) {
        const now = new Date();
        const messageDate = new Date(date);


        const isToday = now.toDateString() === messageDate.toDateString();
        const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === messageDate.toDateString();

        let formattedDate;
        if (isToday) {
            formattedDate = `Hoje, ${messageDate.getHours()}:${messageDate.getMinutes().toString().padStart(2, '0')}`;
        } else if (isYesterday) {
            formattedDate = `Ontem, ${messageDate.getHours()}:${messageDate.getMinutes().toString().padStart(2, '0')}`;
        } else {
            const options = {
                day: '2-digit',
                month: 'short'
            };
            formattedDate = `${messageDate.toLocaleDateString(undefined, options)}, ${messageDate.getHours()}:${messageDate.getMinutes().toString().padStart(2, '0')}`;
        }

        this.timestampElement.textContent = formattedDate;
    }

    // Setter method to set the from attribute of the message card
    set from(from) {
        if (from === 'receiver' || from === 'sender') {
            this._containerElement.classList.add(from);
            this._from = from
        } else {
            throw new Error("Invalid 'from' value. It must be either 'receiver' or 'sender'.");
        }
    }

    get from() {
        return this._from
    }
    // Getter method to retrieve the container element of the message card
    get containerElement() {
        return this._containerElement;
    }

    focus(){
        this._containerElement.scrollIntoView()
    }
    markAsRead(){
        this.unread = false
    }
}
/*
// Create a new MessageCard instance
const messageCard = new MessageCard();

// Set the date (timestamp) of the message
messageCard.timestamp = Date.now(); // Using the current date and time

// Set the from attribute
messageCard.from = 'receiver'; // Can be either 'receiver' or 'sender'

// Append the message card to the DOM (for demonstration purposes)
document.body.appendChild(messageCard.containerElement);

// Set unread to true for demonstration
messageCard.unread = true;

// Listen for the 'READ' event
messageCard.on('READ', () => {
    console.log('Message has been read.');
    
});

// For testing: Focus the message card programmatically to trigger the 'READ' event
messageCard.containerElement.focus();
*/