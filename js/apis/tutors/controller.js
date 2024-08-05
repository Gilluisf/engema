class UsersController extends FirebaseDatabaseFolderController {
	constructor() {
		super()
		this.model = new UsersModel();
		this.view = new UsersView();

		this.model.on('UPDATE', () => this.displayAll())
		this.view.on('PRINT', (uid) => this.add(uid))
		this.view.on('DELETE', (uid) => this.delete(uid));
		this.view.survey.onComplete.add(() => {

			debugger
			this.add(this.view.survey.data)
		})
	}
	async add(data) {

		this.view.showLoader()

		try {
			var {
				uid
			} = data
			delete data.uid
			data.type = 'tutor'
			this.model.add(uid, data)
		} catch (error) {
			console.error(error)
			this.view.showError('Erro ao adicionar')
		}
		this.view.hideLoader()

	}

}