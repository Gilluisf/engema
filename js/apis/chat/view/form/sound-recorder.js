class SoundRecorder extends AbstractFileUploader {
    _mediaRecorder;
    _audioChunks = [];
    audioBlob
    constructor() {
        super();
        this._containerElement.className = 'container recorder';
        this._containerElement.insertAdjacentHTML('afterbegin', `
            <h4 class="center-align"><!--Record Your Message--></h4>
    <div class="row pulse">
        <div class="col s12 center-align">
            <a class="btn-floating btn-large red pulse"><i class="material-icons large white-text">mic</i></a>
            <i class="material-icons large red-text">mic</i>
            <i class="material-icons large green-text">check_circle</i>
        </div>
    </div>
    <div class="row">
        <div class="col s12 center-align">
            <button class="btn waves-effect waves-light red record-button">Gravar</button>
            <button class="btn waves-effect waves-light red stop-button">Parar</button>
            <button class="btn waves-effect waves-light green send-button">Enviar</button>
        </div>
    </div>
    <div class="row">
        <div class="col s12 center-align">
            <audio controls="true">
        </div>
        <!--div class="col s12 center-align info">
            <p>Press the button to begin recording. Click again to stop.</p>
        </div-->
    </div>
        `)

        this.state = 'start'

        this.recordButton.addEventListener('click', () => {
            var state = this._containerElement.getAttribute('state')

            if (state == 'send') {
                this.state = 'start'
            } else {
                this.start()
            }

        });

        this.stopButton.addEventListener('click', () => this.stop());

        this.sendButton.addEventListener('click', async () => {
            var content = await this._convertBlobToDataUrl(this.audioBlob)

            var {
                size
            } = this.audioBlob

            var name = 'Gravação de audio.mp3'

            var file = {
                name,
                content,
                size
            }
            this.triggerEvent('SEND_FILE', file)

        });

    }
    async _convertBlobToDataUrl(blob) {
        let reader = new FileReader();

        reader.readAsDataURL(blob);

        return new Promise((resolve, reject) => {
            reader.onload = function(e) {
                resolve(e.target.result);
            }

            reader.onerror = reject
        })
    }
    _requestStream() {
        return navigator.mediaDevices.getUserMedia({
            audio: true
        })
    }
    _generateAudioBlob() {
        return new Blob(this._audioChunks, {
            type: "audio/ogg;"
        });
    }
    get audioUrl() {
        return URL.createObjectURL(this.audioBlob);
    }
    async _setupMediaRecorder() {

        var stream = await this._requestStream()


        this._mediaRecorder = new MediaRecorder(stream);

        this._mediaRecorder.ondataavailable = (event) => {
            this._audioChunks.push(event.data);
        };

        this._mediaRecorder.onstop = () => {
            this.audioBlob = this._generateAudioBlob()
            const audio = this.audioPlayback;
            audio.src = this.audioUrl;
            this._audioChunks = [];
        };

    }

    get recordButton() {
        return this._containerElement.querySelector('.record-button');
    }

    get stopButton() {
        return this._containerElement.querySelector('.stop-button');
    }

    /*get sendButton() {
        return this._containerElement.querySelector('.send-button');
    }*/

    get audioPlayback() {
        return this._containerElement.querySelector('audio');
    }

    async start() {

            try {

                await this._setupMediaRecorder();
                this._mediaRecorder.start();
                this.state = 'recording'
                this.audioPlayback.src = ""
            } catch (error) {

                var errorMessage = /Permission denied/.test(error) ? 'Precisas conceder permissão para gravar' : 'Erro desconhecido'

                M.toast({
                    html: errorMessage
                })
            }

    }

    stop() {
        this._mediaRecorder.stop();
        this.state = 'send'
    }

    set state(state) {
        this._containerElement.setAttribute('state', state)
        this.recordButton.innerText = state == 'send' ? 'Gravar novamente' : 'Gravar'
    }

}

// Example usage
//const soundRecorder = new SoundRecorder();