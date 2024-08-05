class ChatView extends AbsctractView {
	contactsListElement = document.createElement('div');
	chats = {

	}
	uid
	constructor() {
		super()
		this.contactsListElement.className = 'chats-list'
	}
	_createModal() {

		const modal = new IziModal({
			title: 'null',
			headerColor: '#2196f3',
			fullscreen: true,
			openFullscreen: true
		});
		modal.hideHeader()
		modal.destroyOnClose = false

		return modal
	}

	_createChat() {
		// Create a new instance of ChatScreen
		const chatScreen = new ChatScreen();
		var {
			contactBar
		} = chatScreen
		contactBar.closeButton.addEventListener('click', () => modal.close())
		contactBar.on('OPEN', () => {
			chatScreen.fousLastOrOldestUnredMessage()
		})

		const modal = this._createModal()
		modal.setContent(chatScreen.chatScreenElement)

		const contact = new ContactContainer();
		contact.closeButton.style.display = 'none'
		contact.on("OPEN", () => modal.open())

		var awaitOpenChatScreen = new Promise(resolve => contact.on("OPEN", resolve))
		awaitOpenChatScreen.then(() => {
			//debugger
			chatScreen.fousLastOrOldestUnredMessage()
		})

		var chat = {
			chatScreen,
			contact,
			modal,
			set name(name) {
				chatScreen.contactBar.name = name
				contact.name = name
			}
		}

		return chat
	}
	getMessageByKey(key) {
		// Iterate through all stored chats
		for (const receiver in this.chats) {

			const {
				chatScreen
			} = this.chats[receiver];
			if (chatScreen) {
				const message = chatScreen.messages[key]
				if (message) {
					return message
				}
			}

		}
	}
	markMessageAsRead(key) {
		var message = this.getMessageByKey(key)
		return message.markAsRead()
	}

	generateChatKey({
		receiver,
		sender
	}) {
		if (!sender || !receiver) throw new Error('Invalid arguments')
		if (sender != this.uid) return sender
		if (receiver != this.uid) return receiver

	}

	addChat(contact) {

		var newChat = this._createChat()
		let {
			name
		} = contact

		newChat.name = name
		var chatKey = this.generateChatKey(contact)
		this.chats[chatKey] = newChat


		var {
			contact,
			chatScreen
		} = newChat

		this.contactsListElement.append(contact._containerElement)

		var {
			soundRecorder,
			fileUploader
		} = chatScreen.form

		var receiver = chatKey
		fileUploader.form.on('SEND_FILE', (file) => {
			var type = 'file'
			var message = {
				...file,
				receiver,
				type
			}
			this.triggerEvent('SEND_FILE', message)

		})

		soundRecorder.form.on('SEND_FILE', (file) => {
			var type = 'file'
			file.name = file.name
			this.triggerEvent('SEND_FILE', {
				type,
				...file,
				receiver
			})

		})

		chatScreen.form.on('SEND_TEXT', (text) => {
			let type = 'text'
			this.triggerEvent('SEND_MESSAGE', {
				type,
				text,
				receiver
			})
		})

		return newChat
	}

	addMessage(key, message) {



		var chatKey = this.generateChatKey(message)
		var {
			chatScreen,
			contact
		} = this.chats[chatKey] //|| this.addChat(message)

		if (chatScreen.messages[key]) throw new Error('Message alredy exists')

		var {
			sender,
			unread
		} = message
		message.from = sender == this.uid ? 'sender' : 'receiver'
		var messageCard = chatScreen.addMessage(key, message)

		if (message.type == 'file') {
			messageCard.on('DOWNLOAD', () => {
				this.triggerEvent('DOWNLOAD', key, chatKey)
			})
		}

		if (sender == this.uid) {

			messageCard.focus()

		} else if (unread) {

			contact.unredMessages = chatScreen.countUnreadMessages()

			messageCard.on('READ', () => {
				this.triggerEvent('READ_MESSAGE', key)
				contact.unredMessages = chatScreen.countUnreadMessages()
			})


		}


		return message



	}
}
/*
var chatView
addEventListener('load', () => {
	// Create an instance of ChatView
	chatView = new ChatView();

	// Attach the contacts list element to the DOM
	document.body.append(chatView.contactsListElement);

	// Listen for events triggered by ChatView
	chatView.on('SEND_MESSAGE', (event) => {
		console.log(`Sending ${event.type} to ${event.receiver}:`, event.file || event.text);
	});

	chatView.on('READ_MESSAGE', (messageKey) => {
		console.log(`Message with key ${messageKey} has been read.`);
	});


	// Add a message to the chat
	chatView.addMessage('1', {
		text: 'Wow, sounds like you\'re on a roll!  Maybe you can do a website for me someday ',
		from: 'receiver',
		timestamp: Date.now() + 1000 * 60 * 5, // 5 minutes later
		unread: true,
		receiver: 1
	})

	chatView.addMessage('2', {
		text: 'Wow, sounds like you\'re on a roll!  Maybe you can do a website for me someday ',
		from: 'receiver',
		timestamp: Date.now() + 1000 * 60 * 5, // 5 minutes later
		unread: true,
		receiver: 2
	})

	// Mark the message as read
	chatView.markMessageAsRead('2');
	//Progress bar when sending text messages
	chatView.chats[1].chatScreen.progressBar
	//Progress bar for sound recorder
	chatView.chats[1].chatScreen.form.soundRecorder.form.progressBar
	////Progress bar for file uploader
	chatView.chats[1].chatScreen.form.fileUploader.form.progressBar

})*/