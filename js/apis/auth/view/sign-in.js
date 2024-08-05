class ModalSignIn extends ModalAuth {
    constructor() {

        var json = {
            elements: [{
                    type: "text",
                    name: "email",
                    title: "Email",
                    inputType: "email",
                    isRequired: true,
                    validators: [{
                        type: "email"
                    }]
                },
                {
                    type: "text",
                    name: "password",
                    title: "Senha",
                    inputType: "password",
                    isRequired: true
                },
                {
                    type: "html",
                    name: "customButton",
                    html: "<button submit>Iniciar sessão</button>"
                }
            ],
            showQuestionNumbers: "off"
        };
        super(json)
        this.setTitle('Iniciar sessão')
    }
}
