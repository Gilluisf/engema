class PermanentSurveyJS extends Survey.Model {
	constructor(json) {
		json.showSubmitButton = false
		super(json)

		this.focusFirstQuestionAutomatic = false;
		this.locale = 'pt'
		this.showCompletedPage = false
		this.onAfterRenderPage.add(() => {
			this.removeDefaultCompleteButton()
			this.submitButton.addEventListener('click', () => {
				if (!this.hasErrors()) {
					this.onComplete.callbacks.forEach(callBack => callBack())
				} else {
					console.log('Not filled')
				}
			})
		})


	}
	removeDefaultCompleteButton() {
		var button = this.rootElement.querySelector('.sd-navigation__complete-btn')
		button.remove()
	}
	get submitButton() {
		return this.rootElement.querySelector('button')
	}
}