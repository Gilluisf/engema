class ChatForm extends EasyEvents {
    _containerElement;
    soundRecorder;
    fileUploader;

    constructor() {
        super();
        this._containerElement = this._createContainerElement();

        this.soundRecorder = this._createSoundRecorder()
        this.fileUploader = this._createFileUploader()
        // Event listeners
        this.textarea.addEventListener('input', () => this._handleTextareaInput());
        this.sendButton.addEventListener('click', () => this._handleSendButtonClick());

        // Hide sound recorder and upload file buttons initially
        this._toggleSoundAndFileButtons(true);
        this._handleTextareaInput()
        var uploadFileButton = this._containerElement.querySelector('.upload-file')
        uploadFileButton.addEventListener('click', () => this.openFileUploaderForm())

        var uploadSoundButton = this._containerElement.querySelector('.upload-sound')
        uploadSoundButton.addEventListener('click', () => this.openSoundRecorderForm())
    }
    _createSoundRecorder() {
        // Sound Recorder Form Modal
        const modal = new IziModal({
            title: 'Gravador de voz',
            headerColor: '#2196f3',
            width: 600,
            fullscreen: false,
            openFullscreen: false
        });
        modal.destroyOnClose = false
        // Create Sound Recorder Form
        const form = new SoundRecorder();
        // Set Sound Recorder Form Content to Modal
        modal.setContent(form._containerElement);
        //modal.on('CLOSE_END', () => form.state = 'start')
        return {
            modal,
            form
        }

    }
    _createFileUploader() {
        // Upload File Form Modal
        const modal = new IziModal({
            title: 'Enviar arquivos',
            headerColor: '#4caf50',
            width: 600,
            fullscreen: false,
            openFullscreen: false
        });
        modal.destroyOnClose = false
        // Create Upload File Form
        const form = new FileUploaderForm();
        // Set Upload File Form Content to Modal
        modal.setContent(form._containerElement);

        return {
            modal,
            form
        }
    }
    _createContainerElement() {
        const container = document.createElement('div');
        container.className = 'chat-form';

        container.innerHTML = `
            <div class="file-buttons">
                <a class="btn-floating btn-large waves-effect waves-light red upload-file">
                    <i class="material-icons">attach_file</i>
                </a>

                <a class="btn-floating btn-large waves-effect waves-light brown upload-sound">
                    <i class="material-icons">keyboard_voice</i>
                </a>
            </div>
            <div>
                <textarea class="materialize-textarea" placeholder="Digite sua mensagem aqui..." style="height: 43px;"></textarea>
            </div>
            <div>
                <button class="btn waves-effect waves-light send-text">
                    <i class="material-icons right">send</i>
                </button>
            </div>
        `;

        return container;
    }
    openSoundRecorderForm() {
        this.soundRecorder.modal.open()
    }

    openFileUploaderForm() {
        this.fileUploader.modal.open()
    }
    get textarea() {
        return this._containerElement.querySelector('textarea');
    }
    clearTextArea() {
        this.textarea.value = ''
        this._handleTextareaInput()
    }
    get sendButton() {
        return this._containerElement.querySelector('.send-text');
    }

    _handleTextareaInput() {
        const text = this.textarea.value.trim();
        // Toggle sound recorder and upload file buttons based on input focus
        this._toggleSoundAndFileButtons(text.length == 0);
    }

    _toggleSoundAndFileButtons(show) {
        this._containerElement.setAttribute('typing', !show)
    }

    _handleSendButtonClick() {
        const text = this.textarea.value.trim();
        if (text.length > 0) {
            this.triggerEvent('SEND_TEXT', text);
            //this.sendButton.style.display = 'none';
        }
    }
}


/*const chatForm = new ChatForm();

addEventListener('load', () => {
    document.body.appendChild(chatForm._containerElement)
    
})*/