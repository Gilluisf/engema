class UsersView extends FirebaseDatabaseFolderView {
	itemEvents = [
		'DELETE',
	]
	addUserModal = this._createAddUserModal()
	rootElement = document.createElement('div')
	itemsContainer = document.createElement('tbody')
	get addTutorButton() {
		return this.rootElement.querySelector('a')
	}
	constructor() {
		super()
		this.rootElement.innerHTML = `
		<a id="add-tutor-btn" class="btn waves-effect waves-light">Adicionar tutor</a>
		<table>
			<thead>
				<tr>
					<td>Nome</td>
					<td>Email</td>
					<td>Senha</td>
					<td>Tipo</td>
				</tr>
			</thead>
			
		</table>
		`


		var table = this.rootElement.querySelector('table')
		table.append(this.itemsContainer)

		this.addTutorButton.addEventListener('click', () => {
			this.addUserModal.open()
		});


	}
	_createAddUserModal() {
		const surveyJSON = {
			elements: [{
					type: "text",
					name: "name",
					title: "Nome completo",
					isRequired: true
				}, {
					type: "text",
					name: "email",
					title: "Email",
					isRequired: true,
					validators: [{
						type: "email"
					}]
				}, {
					type: 'text',
					name: 'uid',
					title: 'ID',
					isRequired: true,
				},

				{
					"type": "checkbox",
					"name": "subjects",
					title: 'Disciplinas',
					"choices": [],
					"isRequired": true,
					"colCount": 2,
					"showNoneItem": true,
					"showSelectAllItem": true,
					"separateSpecialChoices": true
				}, {
					type: "html",
					name: "customButton",
					html: "<button submit>Finalizar</button>"
				}
			]
		};
		this.survey = new PermanentSurveyJS(surveyJSON);

		var tempElement = document.createElement('div')
		$(tempElement).Survey({
			model: this.survey

		})
		var modalOptions = {
			title: 'Adicionar tutor',
			fullscreen: false,
			openFullscreen: false
		}
		var modal = new IziModal(modalOptions)
		modal.destroyOnClose = false
		modal.setContent(tempElement)
		return modal
	}


	get subjects() {
		return this.survey.getQuestionByName('subjects')
	}
	display(user) {
		var {
			type,
			name,
			email,
			password
		} = user
		const userView = new SingleUserView();
		userView.name = name
		userView.email = email
		userView.password = password
		userView.type = type

		var tbody = this.itemsContainer //.querySelector('tbody')
		tbody.append(userView._containerElement)
		return userView
	}

}