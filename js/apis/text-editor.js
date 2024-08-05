class IframeModal extends IziModal {
    constructor(obj) {
        obj.iframe = true
        super(obj)
        this._listenMessages()
    }
    getIframeElement() {
        return this._element.querySelector('iframe')
    }
    
    async sendData(data) {


        // Execute a script in the in-app browser to set the code
        var iframeElement = this.getIframeElement()
        var state = this.state
        if (state != 'opened') {
            
            await new Promise(resolve => this.on('OPEN_END', resolve)
            )
        }

        iframeElement.contentWindow.postMessage(data, '*')


    }

    _listenMessages() {
        // Add an event listener to the in-app browser to receive messages
        window.addEventListener('message', (event) => {
            if(this.state == 'closed') return
            
            var {
                type
            } = event.data

            if (type == 'iframe') {
                delete event.data.type
                this.triggerEvent('MESSAGE', event.data)
            }
        });
    }
}
/*
// Create a new instance of the TextEditor class

const textEditor = new TextEditor('quill/examples/full.html','_modal-demo');

textEditor.open('quill/examples/full.html')

// Set HTML code in the text editor
textEditor.setData('<h1>Hello, World!</h1>');

// Add a save callback to the text editor
textEditor.addSaveCallback((data) => {
  console.log('Received data from the text editor:', data);
});*/