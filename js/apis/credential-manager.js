class UserCredentialManager extends FirebaseDatabaseFolderModel {
	folder = 'credentials'

	add(data, uid) {
		return this.folderRef.child(uid).set(data)
	}
	async get(uid) {
		var snapShot = await this.folderRef.child(uid).get()
		return snapShot.val()
	}
}