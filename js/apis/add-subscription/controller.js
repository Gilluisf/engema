class AddSubscriptionController {
	constructor() {
		this.view = new AddSubscriptionView()
		
		
		this.model = new AddSubscriptionModel()
		this.view.survey.onComplete.add(async () => {

			try {
				this.view.showLoader();
				var {
					data
				} = this.view.survey
				await this.model.add(data)
				this.view.showMessage('Inscrição adicionada')
			} catch (e) {
				console.error(e)
				this.view.showError('Erro ao fazer inscrição'+e);
			}

			this.view.hideLoader();

		})
	}
}