class ProfileView extends AbsctractView {
    survey
    type
    constructor() {
        super()



    }

    get _formFields() {
        const gradeChoices = []

        for (var i = 7; i <= 12; i++) {
            let text = i + 'ª Classe'

            gradeChoices.push({
                text,
                value: i
            })
        }

        const student = {
            elements: [{
                    type: "text",
                    name: "name",
                    title: "Nome completo:",
                    isRequired: true
                },

                {
                    type: "dropdown",
                    name: "grade",
                    title: "Classe:",
                    "searchEnabled": false, // Disable manual entry
                    choices: gradeChoices,
                    isRequired: true
                }, {
                    type: "text",
                    name: "deficiency",
                    title: "Deficiencia:",
                    inputType: "textarea",
                    //placeholder: "Enter any academic deficiency",
                    isRequired: true
                }, {
                    type: "dropdown",
                    name: "gender",
                    title: "Genero:",
                    "searchEnabled": false,
                    choices: [{
                        value: "male",
                        text: "Masculino"
                    }, {
                        value: "female",
                        text: "Feminino"
                    }],
                    isRequired: true
                }, {
                    type: "text",
                    name: "birthDate",
                    title: "Data de nascimento:",
                    inputType: 'date',
                    isRequired: true
                }, {
                    type: "text",
                    name: "parent",
                    title: "Encarregado de educação:",
                    isRequired: true
                }, {
                    type: "text",
                    name: "occupation",
                    title: "Ocupação:",
                    isRequired: true
                }, {
                    type: "text",
                    name: "phoneNumber",
                    title: "Telefone:",
                    isRequired: true
                }, {
                    type: "text",
                    name: "phoneNumber2",
                    title: "Telefone:",
                    isRequired: false
                },
            ]
        };

        const tutor = {
            elements: [{
                    type: "text",
                    name: "name",
                    title: "Nome completo:",
                    isRequired: true
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
                }
            ]
        }

        const admin = {
            elements: [

            ]
        }
        const commonOptions = [{
            type: "html",
            name: "customButton",
            html: "<button submit>Finalizar</button>"
        }]



        commonOptions.forEach(function(choice) {
            tutor.elements.push(choice)
            student.elements.push(choice)
            //admin.elements.push(choice)
        });

        return {
            tutor,
            student
        }
    }
    init() {
        var json = this._formFields[this.type]
        // Initialize the survey
        var survey = new PermanentSurveyJS(json);

        $("#profile").Survey({
            model: survey
        });

        this.survey = survey
    }
    set data(data) {
        this.survey.data = data
    }
    get subjects() {
        return this.survey.getQuestionByName('subjects')
    }
    get data() {
        return this.survey.data
    }
}