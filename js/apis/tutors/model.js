class UsersModel extends FirebaseDatabaseFolderModel {
	folder = 'users'
	constructor() {
		super()
	}
	
	async getAll() {
		var snapShot = await (this.folderRefFiltered || this.folderRef).once('value')

		var users = snapShot.toJSON()

		for (const userId in users) {

			let credentialManager = new UserCredentialManager();
			let credentials = await credentialManager.get(userId)
			if (credentials) {
				let {
					email,
					password
				} = credentials

				users[userId].email = email
				users[userId].password = password
			}
		}
		return this._removeAdminUsers(users)
	}

	_removeAdminUsers(users) {
		const result = {};
		for (const userId in users) {
			if (users[userId].type !== "admin") {
				result[userId] = users[userId];
			}
		}
		return result;
	}

	async add(uid, data){
		return this.folderRef.child(uid).set(data)
	}
}