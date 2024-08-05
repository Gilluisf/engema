class AddSubscriptionModel extends FirebaseDatabaseFolderModel {
    folder = 'subscriptions'
    get user(){
        var user = new UserModel()
        return user
    }
    constructor() {
        super()
    }

    add(subscription) {
        
        subscription.timestamp = new Date().getTime()
        subscription.uid = this.user.currentUser.uid
        subscription.state = 'pending'
        return this.folderRef.push().set(subscription);

    }
}