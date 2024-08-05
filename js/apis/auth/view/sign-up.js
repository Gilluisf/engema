class ModalSignUp extends ModalAuth {
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
                    type: "text",
                    name: "confirm_password",
                    title: "Senha",
                    inputType: "password",
                    isRequired: true,
                    validators: [{
                        type: "expression",
                        expression: "{password} == {confirm_password}",
                        text: "Senhas nao sao iguais"
                    }]
                },
                {
                    type: "html",
                    name: "customButton",
                    html: "<button submit>Criar conta</button>"
                }
            ],
            showQuestionNumbers: "off"
        };
        super(json)
        this.setTitle('Criar conta')
    }
}