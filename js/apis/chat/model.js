class ChatModel extends FirebaseDatabaseFolderModel {
    folder = 'messages'
    uid
    userSubjects = []
    constructor() {
        super()
    }

    add(message) {
        message.sender = this.uid
        message.timestamp = Date.now()
        message.unread = true
        const newMessageRef = this.folderRef.push();
        return newMessageRef.set(message);

    }
    async addFileMessage(message, statrChangeObserver, uploadTaskId) {
        var {
            content
        } = message

        var storageRef = firebase.storage().ref();
        var path = `/messages/${this.uid}/${Date.now()}-${message.name}`
        var fileRef = storageRef.child(path)

        if (typeof content == 'string') {
            var uploadTask = fileRef.putString(content, 'data_url');
        } else {
            var uploadTask = fileRef.put(content);
        }



        await new Promise((resolve, reject) => {
            this.on('CANCEL_UPLOAD', (id) => {
                if (id == uploadTaskId) {
                    uploadTask.cancel()
                    reject('storage\/canceled')
                }
            })
            uploadTask.on('state_changed', statrChangeObserver, reject,
                () => {
                    resolve(uploadTask)

                }
            );
        })

        var {
            fullPath
        } = uploadTask.snapshot.ref
        message.fullPath = fullPath

        delete message.content

        return this.add(message)



    }

    listenReadMessage(key) {
        const messageRef = this.folderRef.child(key + '/unread');
        messageRef.on('value', (snapshot) => {
            const unread = snapshot.val();

            if (!unread) this.triggerEvent('READ_MESSAGE', key);

        });
    }

    markMessageAsRead(key) {
        return this.folderRef.child(key + '/unread').set(false)
    }

    listenForNewMessages() {
        this.folderRef.on('child_added', (snapshot) => {

            const newMessage = snapshot.val();
            var {
                key
            } = snapshot

            this.triggerEvent('NEW_MESSAGE', key, newMessage)

            var {
                sender,
                unread
            } = newMessage

            if (sender != this.uid && unread) {
                this.listenReadMessage(key)
            }


        });
    }
    async downloadMessageFile(key) {
        const url = await this.getMessageFileUrl(key)
        const downloadUrl = await firebase.storage().ref(url).getDownloadURL()
        window.open(downloadUrl)
    }
    async getMessageFileUrl(key) {
        const snapShot = await this.folderRef.child(key + '/fullPath').once('value')
        const url = snapShot.toJSON()
        return url
    }


    async getContacts() {
        var userType = this.type == 'student' ? 'tutor' : 'student'
        var snapShot = await firebase.database().ref('users').orderByChild('type').equalTo(userType).get()
        var contacts = snapShot.val()

        if (this.tutorSubjects && this.type == 'student') {

            for (let key in contacts) {
                // Function to check if one of the subjects from the first array is in the second array
                let subjects = Object.values(contacts[key].subjects)
                const containsSubject = this.tutorSubjects.some(subject => subjects.includes(subject));

                if (!containsSubject) delete contacts[key]
            }
        }
        return contacts
    }
}

class MessagesDeleter extends FirebaseDatabaseFolderModel {
    folder = 'messages'
    constructor() {
        super()
        this.listenChange()
        this.folderRef.on('child_added', async (snapShot) => {
            var {
                key
            } = snapShot
            var message = snapShot.val()
            var {
                timestamp
            } = message
            var canDelete = this.isDifferenceGreaterThanOneMonth(timestamp)
            if (canDelete) await this.deleteMessage(key)
        })
    }
    async getMessage(key) {
        const snapShot = await this.folderRef.child(key).once('value');
        const message = snapShot.val();

        return message
    }
    // Make sure to include Moment.js library in your project

    isDifferenceGreaterThanOneMonth(dateTime) {
        // Parse the given dateTime into a moment object
        const givenDate = moment(dateTime);

        // Get the current date as a moment object
        const currentDate = moment();

        // Calculate the difference in months between the current date and the given date
        const differenceInMonths = currentDate.diff(givenDate, 'months');

        // Check if the difference is greater than 1 month
        return differenceInMonths > 1;
    }



    async deleteMessage(key) {
        // Retrieve the message from the database

        const message = await this.getMessage(key)

        // Check if the message has a 'fullPath' field indicating it's a file message
        if (message.type == 'file') {
            return this.deleteFileMessage(key);
        } else {
            return this.deleteTextMessage(key);
        }

    }

    deleteTextMessage(key) {
        // Remove the message from the database
        return this.folderRef.child(key).remove();
    }

    async deleteFileMessage(key) {
        // Get the full path of the file from the message
        const snapShot = await this.folderRef.child(key + '/fullPath').once('value');
        const fullPath = snapShot.val();

        // Remove the file from Firebase Storage
        if (fullPath) {
            const fileRef = firebase.storage().ref(fullPath);
            await fileRef.delete();
        }

        // Remove the message from the database
        return this.deleteTextMessage(key)
    }

}


    



/*
// Assuming you have instantiated an instance of ChatModel
const chatModel = new ChatModel();

// Example of adding a message
const messageToAdd = {
    text: "Hello there!",
    sender: '', // This will be set automatically by the ChatModel
    timestamp: '', // This will be set automatically by the ChatModel
    unread: true
};

// Adding a message
chatModel.add(messageToAdd)
    .then(() => {
        console.log("Message added successfully!");
    })
    .catch((error) => {
        console.error("Error adding message:", error);
    });

// Example of listening for new messages
chatModel.listenForNewMessages((newMessage) => {
    console.log("New message received:", newMessage);
});

// Example of marking a message as read (assuming you have the message key)
const messageKey = '-Mabcd1234'; // Replace with an actual message key
chatModel.markMessageAsRead(messageKey)
    .then(() => {
        console.log("Message marked as read successfully!");
    })
    .catch((error) => {
        console.error("Error marking message as read:", error);
    });
*/