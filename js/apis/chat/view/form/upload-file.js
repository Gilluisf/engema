class AbstractFileUploader extends EasyEvents {
    // Private variable to store the container element of the upload form
    _containerElement = this._createContainerElement();
    progressBar = new ProgressBar()
    constructor() {
        super()
        /*this._containerElement = this._createContainerElement();
        this.progressBar = new ProgressBar()*/
        //this.cancelButton.addEventListener('click', () => this.triggerEvent('CANCEL_UPLOAD');
        this.progressBar.show()
        this.progressContainer.insertAdjacentElement('afterbegin', this.progressBar.containerElement)

    }
    // Method to create the container element for the upload form
    _createContainerElement() {
        const container = document.createElement('div');
        container.className = 'container';

        container.innerHTML = `
            <div class="progress-container" style="display: none;">
                <button class="btn red cancel-button">Cancelar</button>
            </div>
        `;

        return container;
    }
    get progressContainer() {
        return this._containerElement.querySelector('.progress-container')
    }
    // Getter method to retrieve the send button element
    get sendButton() {
        return this._containerElement.querySelector('.send-button');
    }
    // Getter method to retrieve the cancel button element
    get cancelButton() {
        return this._containerElement.querySelector('.cancel-button');
    }

    // Setter method to set the progress bar percentage
    set percentage(percentage) {
        const progressBar = this._containerElement.querySelector('.determinate');
        progressBar.style.width = percentage + '%';
    }

    // Method to handle upload cancellation
    _cancelUpload() {

        this.sendButton.style.display = 'block'
        //this.survey.getQuestionByName('file').value = null
        this.percentage = 0;
        this.progressContainer.style.display = 'none'
        this.triggerEvent('CANCEL')
    }
}
// FileUploaderForm class as previously defined
class FileUploaderForm extends AbstractFileUploader {

    // Constructor to create a new UploadFileForm instance
    constructor() {
        super();
        var randId = ('file-uploader' + Math.random()).replace('.', '')
        this._containerElement.insertAdjacentHTML('afterbegin', `<div class="file-field input-field">
      <div class="btn">
        <span>Selecionar arquivo</span>
        <input type="file">
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text">
      </div>
    </div><button class="btn send-button">Enviar</button>`)
        this.sendButton.addEventListener('click', () => this.send());

    }
    send() {
        var file = this._inputElement.files[0];
        var {
            name,
            size,
            type
        } = file

        const blob = new Blob([file], {
            type
        });



        if (file) {

            this.triggerEvent('SEND_FILE', {
                name,
                size,
                content: blob
            })
        } else {

        }
    }

    get _inputElement() {
        return this._containerElement.querySelector('input[type=file]')
    }

    get fileSize() {

        return this._inputElement.files[0].size
    }



}

// Example usage
//const fileUploaderForm = new FileUploaderForm();