class AddSubscriptionView extends AbsctractView {
	_prices = []

	constructor() {
		super()
		var json = {

			elements: [{
				type: "dropdown",
				name: "grade",
				title: "Classe:",
				choices: [],
				isRequired: true
			}, {
				type: "checkbox",
				name: "subjects",
				title: "Disciplinas:",
				choices: [],
				"searchEnabled": false,
				isRequired: true
			}, {
				type: "dropdown",
				name: 'duration',
				title: 'Duração',
				choices: [],
				"searchEnabled": false,
				isRequired: true
			}, {
				type: "text",
				name: "phoneNumber",
				title: "Número de Telefone:",
				isRequired: true,
				"inputType": "number",

			}, {
				type: "dropdown",
				name: "period",
				"searchEnabled": false,
				title: "Período de Explicação:",
				choices: [{
					value: "morning",
					text: "Nas manhas"
				}, {
					value: "afternoon",
					text: "Nas tardes"
				}],
				isRequired: true
			}, {
				type: "dropdown",
				name: "teachingModel",
				"searchEnabled": false,
				title: "Modelo de ensino:",
				choices: [{
					value: "online",
					text: "Online"
				}, {
					value: "face-to-face",
					text: "Presencial"
				}],
				isRequired: true
			}, {
				type: "html",
				name: "customButton",
				html: "<button submit>Finalizar</button>"
			}]
		};

		this.survey = new PermanentSurveyJS(json);


		this.showDuration()



		this.survey.onValueChanged.add(() => this.handleValueChange())



		this.survey.onAfterRenderPage.add(() =>
			this.survey.submitButton.innerText = 'Submeter'
		)
	}


	set prices(prices) {
		this._prices = prices
		this.grades = Object.keys(prices)
	}
	get prices() {
		return this._prices
	}
	get availableMonths() {
		return Array.from({
			length: 12
		}, (_, index) => ({
			value: index + 1,
			type: 'number',
			text: `${index + 1} ${index === 0 ? 'Mês' : 'Meses'}`
		}));
	}

	showDuration() {

		var price = this.calculateMonthlyPrice()
		let months = this.availableMonths.map((option, index) => {

			index++
			let totalPrice = price * index
			option.text += totalPrice > 0 ? ` (${totalPrice} MT)` : ''
			return option
		})
		this.survey.getQuestionByName('duration').choices = months
	}

	hideDuration() {
		this.survey.getQuestionByName('duration').choices = []
	}
	handleValueChange() {
		if ('grade' in this.survey.data) {

			this.showDuration()
			this.showSubjects()

		} else {

			this.subjects = []
			this.hideDuration()
		}
	}
	showSubjects() {
		var {
			grade
		} = this.survey.data

		this.subjects = Object.keys(this.prices[grade])
	}
	set subjects(subjects) {
		this.survey.getQuestionByName('subjects').choices = subjects
	}
	set grades(grades) {
		this.survey.getQuestionByName('grade').choices = grades.map((i) => {

			return {
				value: i,
				text: i + 'ª'
			}
		})
	}
	set selectedGrade(grade) {
		this.survey.getQuestionByName('grade').value = grade
	}
	selectAllSubjects() {
		this.survey.getQuestionByName('subjects').selectAll()
	}

	calculateMonthlyPrice() {
		return PricingCalculator.calculate(this.survey.data)
	}
}
// Define the PricingCalculator class with prices data
class PricingCalculator {
	static prices = {
		grade1: {
			subject1: {
				price: 10
			},
			subject2: {
				price: 15
			}
		},
		grade2: {
			subject1: {
				price: 12
			},
			subject2: {
				price: 18
			}
		}
		// Add more grades and subjects as needed
	};

	static calculate(subscription) {
		var {
			grade,
			subjects,
			duration
		} = subscription;

		if (!subjects || !this.prices || !this.prices[grade]) {
			return 0;
		}

		var amount = 0;

		for (var subject of subjects) {
			if (this.prices[grade][subject] && this.prices[grade][subject].price) {
				let {
					price
				} = this.prices[grade][subject];
				amount += Number(price);
			}
		}

		return amount * (duration || 1);
	}
}