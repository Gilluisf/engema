class ChatScreen extends AbsctractView {
    chatScreenElement = this._createChatScreenElement()
    // Create the contact container
    contactBar = new ContactContainer();
    // Create the progress bar
    progressBar = new ProgressBar();
    form = new ChatForm();
    // Initialize messages object
    messages = {};

    constructor() {
        super()

        this.chatScreenElement.appendChild(this.contactBar._containerElement);

        // Create the messages list container
        this.messagesContainer = this._createMessagesContainer()
        this.chatScreenElement.appendChild(this.messagesContainer);

        this.chatScreenElement.appendChild(this.progressBar.containerElement)
        // Create the chat form
        this.chatScreenElement.appendChild(this.form._containerElement);
    }

    _createChatScreenElement() {
        var chatScreenElement = document.createElement('div');
        chatScreenElement.className = 'chat-screen';
        return chatScreenElement
    }
    _createMessagesContainer() {
        var messagesContainer = document.createElement('div');
        messagesContainer.className = 'messages-list  grey lighten-1';
        return messagesContainer
    }
    _updateUnreadCount() {
        // Count unread messages
        const unreadCount = this.countUnreadMessages();
        this.contactBar.unredMessages = unreadCount
    }

    addMessage(key, message) {

        if (this.messages[key]) return;

        let {
            from,
            unread,
            timestamp,
            type
        } = message

        const messageCard = type == 'file' ? new FileMessageCard() : new TextMessageCard(message);
        messageCard.from = from
        messageCard.unread = unread
        messageCard.timestamp = timestamp
        messageCard.on('READ', () => this._updateUnreadCount())


        if (type == 'file') {

            var {
                name,
                size
            } = message
            messageCard.fileName = name
            messageCard.fileSize = size
            messageCard.on('DOWNLOAD', () => this.triggerEvent('DOWNLOAD', key))
        } else {
            
            messageCard.text = message.text
        }

        this.messages[key] = messageCard;

        this.messagesContainer.appendChild(messageCard._containerElement);

        this._updateUnreadCount()
        return messageCard

    }

    countUnreadMessages() {
        var unreadMessages = Object.values(this.messages).filter(message => message.from == 'receiver' && message.unread)
        return unreadMessages.length;
    }

    get oldestUnreadMessage() {
        let messages = Object.values(this.messages)
        let foundMessage = messages.find(message => message.unread == true)
        return foundMessage
    }
    get lastMessage() {
        let messages = Object.values(this.messages)
        let foundMessage = messages.pop()
        return foundMessage
    }

    fousLastOrOldestUnredMessage() {
        var messageCard = this.oldestUnreadMessage || this.lastMessage
        if (messageCard) messageCard.focus()
    }
    markMessageAsRead(key) {
        this.messages[key].unread = false
    }
}

/*
addEventListener('load', () => {
    // Create a new instance of ChatScreen
    const chatScreen = new ChatScreen();
    var {
        chatScreenElement
    } = chatScreen
    document.body.append(chatScreenElement)
    chatScreenElement.scrollIntoView()
    window.chatScreen = chatScreen
    //Shows progress bar
    chatScreen.progressBar.show()

    // Simulate adding messages
    chatScreen.addMessage('1', {
        text: 'Hello there!',
        from: 'sender',
        timestamp: Date.now(),
        unread: false
    });

    chatScreen.addMessage('2', {
        text: 'Hi John! How are you?',
        from: 'receiver',
        timestamp: Date.now(),
        unread: true
    });

    chatScreen.addMessage('3', {
        text: 'I\'m doing well, thanks for asking! What about you?',
        from: 'sender',
        timestamp: Date.now(),
        unread: false
    });

    chatScreen.addMessage('4', {
        text: 'I\'m good, just got back from a walk. How was your day?',
        from: 'receiver',
        timestamp: Date.now() + 1000 * 60, // 1 minute later
        unread: true
    });

    chatScreen.addMessage('5', {
        text: 'It was great! I finished that project I was working on. Feeling pretty accomplished.',
        from: 'sender',
        timestamp: Date.now() + 1000 * 60 * 2, // 2 minutes later
        unread: false
    });

    chatScreen.addMessage('6', {
        text: 'That\'s awesome! Congratulations! What was it about?',
        from: 'receiver',
        timestamp: Date.now() + 1000 * 60 * 3, // 3 minutes later
        unread: true
    });

    chatScreen.addMessage('7', {
        text: 'Thanks! It was a website redesign for a local bakery. They loved it!',
        from: 'sender',
        timestamp: Date.now() + 1000 * 60 * 4, // 4 minutes later
        unread: false
    });

    chatScreen.addMessage('8', {
        text: 'Wow, sounds like you\'re on a roll!  Maybe you can do a website for me someday ',
        from: 'receiver',
        timestamp: Date.now() + 1000 * 60 * 5, // 5 minutes later
        unread: true
    });

    // ... (more messages) 

    // Count unread messages
    const unreadCount = chatScreen.countUnreadMessages();
    console.log(`Unread messages: ${unreadCount}`);

    // Mark a message as read
    chatScreen.markMessageAsRead('1');


})*/