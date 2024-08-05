class AuthController {
    view = new AuthView
    model = new UserModel
    ERROR_MESSAGES = {
        "auth/email-change-needs-verification": "Mudança de email precisa de verificação.",
        "auth/email-already-in-use": "Email já está em uso.",
        "auth/internal-error": "Erro interno.",
        "auth/invalid-email": "Email inválido.",
        "auth/wrong-password": "Senha incorreta.",
        "auth/invalid-phone-number": "Número de telefone inválido.",
        "auth/missing-verification-code": "Código de verificação ausente.",
        "auth/network-request-failed": "Falha na solicitação de rede.",
        "auth/quota-exceeded": "Quota excedida.",
        "auth/user-not-found": "Usuário não encontrado.",
        "auth/user-disabled": "Usuário desativado.",
        "auth/user-mismatch": "Incompatibilidade de usuário.",
        "auth/user-signed-out": "Usuário desconectado.",
        "auth/weak-password": "Senha fraca."
    };

    getErrorMessage(errorCode) {
        return this.ERROR_MESSAGES[errorCode] || "Erro desconhecido.";
    }
    _saveCredentails() {
        const credentialManager = new UserCredentialManager();

        let {email, password} = this.model
        let userData = {email, password}
        let {uid} = this.model.currentUser


        // Adding user credentials to the database
        return credentialManager.add(userData, uid);
    }
    constructor() {
        this.view.signUp.survey.onComplete.add(() => {
            var {
                data
            } = this.view.signUp.survey
            this.createAccount(data)
        })
        this.view.signIn.survey.onComplete.add(() => {
            var {
                data
            } = this.view.signIn.survey
            this.signIn(data)
        })
    }
    async createAccount(data) {
        this.view.showLoader('Criando conta...')
        try {
            this.model.email = data.email;
            this.model.password = data.password;
            const result = await this.model.createAccount();
            await this._saveCredentails()
            this.view.showMessage("Conta criada com sucesso");
            location.href = 'user.html'
            // Additional logic after account creation, e.g., navigate to a different page
        } catch (error) {
            this.view.hideLoader()
            console.log(error)
            this.showErrorByCode(error.code)

            // Handle the error, e.g., display an error message
        }
        
    }

    showErrorByCode(code) {
        var text = this.ERROR_MESSAGES[code] || "Erro desconhecido.";
        this.view.showError(text);
    }
    async signIn(data) {
        this.view.showLoader('Iniciando sessão...')
        try {
            this.model.email = data.email;
            this.model.password = data.password;
            const result = await this.model.signIn();
            await this._saveCredentails()
            this.view.showMessage("Entrando no sistema");
            location.href = 'user.html'
            
        } catch (error) {
            this.view.hideLoader()
            console.error(error)
            this.showErrorByCode(error.code)
            // Handle the error, e.g., display an error message
        }
        
    }
}