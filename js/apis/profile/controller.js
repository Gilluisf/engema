class ProfileController {
    model = new UserModel();
    view = new ProfileView();

    async save() {


        this.view.showLoader()
        try {
            const {data} = this.view

            await this.model.personalData.set(data);
            this.view.showMessage("Guardado");
        } catch (e) {
            this.view.showError("Ocorreu um erro ao guardar");
        }

        this.view.hideLoader()

    }
    async init() {
        try {
            

            // Check if the user is signed in
            const user = this.model.currentUser;
            if (user) {
                // Fetch personal data and populate the survey
                const personalData = await this.model.personalData.get();
                this.view.type = personalData.type
                this.view.init()
                this.view.data = (personalData);
            }

            // Set up the survey completion handler
            this.view.survey.onComplete.add(() => this.save());

        } catch (error) {
            this.view.showError("Erro ao inicializar perfil:", error);
        }
    }
}
