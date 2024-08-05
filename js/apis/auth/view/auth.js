class ModalAuth extends IziModal {
    constructor(json) {
        var modalOptions = {
            //title: 'Fazer inscrição',
            fullscreen: false,
            openFullscreen: false
        }

        super(modalOptions)
        this.destroyOnClose = false

        this.survey = new PermanentSurveyJS(json);

        this.setContent('<div class="form-container"></div>')
        let formContainer = this._element.querySelector('.form-container')
        $(formContainer).Survey({
            model: this.survey

        })

    }


}