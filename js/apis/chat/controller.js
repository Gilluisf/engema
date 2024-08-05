class ChatController {
    constructor() {
        this.model = new ChatModel(); // Assuming ChatModel is defined elsewhere
        this.view = new ChatView(); // Assuming ChatView is defined elsewhere
        // Attach event listeners from the view

        this.attachViewEvents();
        this.attachModelEvents()
    }
    set uid(uid) {
        this.model.uid = uid
        this.view.uid = uid
    }

    async init(){
        const contacts = await this.model.getContacts();
        for (let receiver in contacts) {
            let sender = this.model.uid
            let { name } = contacts[receiver];
            this.view.addChat({ sender, receiver, name });
        }
    }


    attachViewEvents() {
        // Example: Listen for SEND_MESSAGE event from the view
        this.view.on('SEND_MESSAGE', (message) => {
            this.sendMessage(message);
        });
        this.view.on('DOWNLOAD', (key, chat) => {
            this.downloadMessageFile(key, chat);
        });
        this.view.on('SEND_FILE', (message) => {
            this.sendFileMessage(message);
        });
        // Example: Listen for READ_MESSAGE event from the view
        this.view.on('READ_MESSAGE', (messageKey) => {
            this.markMessageAsRead(messageKey);
        });
    }

    attachModelEvents() {
        this.model.on('NEW_MESSAGE', (key, newMessage) => {
            this.view.addMessage(key, newMessage)
        });

        this.model.on('READ_MESSAGE', (key) => {
            this.view.markMessageAsRead(key)
        })
    }
    async downloadMessageFile(key, chatKey) {
        var {

            progressBar,
        } = this.view.chats[chatKey].chatScreen

        progressBar.show()
        try {
            await this.model.downloadMessageFile(key)
        } catch (e) {
            this.view.showError('Erro ao baixar arquivo')
        }
        progressBar.hide()
    }
    async sendFileMessage(message) {

        var formType = /Gravação de audio.mp3/.test(message.name)?'soundRecorder':'fileUploader'
        var {form} = this.view.chats[message.receiver].chatScreen.form[formType]

        var {
            progressContainer,
            progressBar,
            sendButton,
            cancelButton
        } = form

        progressBar.percentage = 0
        progressContainer.style.display = 'block'
        sendButton.disabled = true


        var stateChangeObserver = (snapshot) => {

            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressBar.determinate = progress > 0
            progressBar.percentage = progress

            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }

        var uploadTaskId = Math.random()

        cancelButton.addEventListener('click', () => {
            this.model.triggerEvent('CANCEL_UPLOAD', uploadTaskId)
        })

        try {
            var uploadRef = await this.model.addFileMessage(message, stateChangeObserver, uploadTaskId)
            progressBar.determinate = false

            console.log(uploadRef)
            this.view.showMessage('Enviado')
        } catch (error) {
            console.error(error)
            if (/storage\/canceled/i.test(error)) {
                this.view.showError('Envio cancelado')
            } else {
                this.view.showError('Erro desconhecido')
            }
        }
        
        progressContainer.style.display = 'none'
        progressBar.determinate = false
        sendButton.disabled = false

        if(formType == 'soundRecorder'){
            form.state = 'start'
        } else {
            //form.survey.data = {}
        }

    }
    async sendMessage(messageToAdd) {
        let {
            sender,
            receiver
        } = messageToAdd

        let chat = this.view['chats'][sender] || this.view['chats'][receiver]

        let {
            progressBar,
            form
        } = chat.chatScreen

        progressBar.show()

        try {

            // Example: Add message to the model
            await this.model.add(messageToAdd);
            form.clearTextArea()
        } catch (error) {
            console.error(error)
            this.view.showMessage("Error sending message:", error);
        }



        progressBar.hide()
    }

    async markMessageAsRead(messageKey) {
        try {
            // Example: Mark message as read in the model
            await this.model.markMessageAsRead(messageKey);
            console.log("Message marked as read successfully!");
        } catch (error) {
            console.error("Error marking message as read:", error);
        }
    }
}

// Example usage:

/*const chatController = new ChatController();

chatController.uid = sender
var chat = chatController.view.addChat({
    sender,
    receiver
})
chat.name = receiver
document.body.append(chatController.view.contactsListElement)
addEventListener('load', () => {
    chatController.model.listenForNewMessages()
    //chatController.view.chats[receiver].modal.open()
    //chatController.view.chats[receiver].chatScreen.form.fileUploader.modal.open()
})*/