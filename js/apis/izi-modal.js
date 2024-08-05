class IziModal extends EasyEvents {
    destroyOnClose = true
    _saveCallback;

    _createElement() {
        var div = document.createElement('div')
        div.setAttribute('class', 'iziModal')
        return div
    }

    constructor(obj) {

        super()

        this._element = this._createElement()


        let modalSettings = {
            //title: title || 'Editar',
            //subtitle: '',
            headerColor: '#9c27b0',
            background: null,
            theme: 'dark', // light
            icon: null,
            iconText: null,
            iconColor: '',
            rtl: false,
            width: 600,
            top: null,
            bottom: null,
            borderBottom: true,
            padding: 0,
            radius: 3,
            zindex: 2,
            iframeHeight: 400,
            focusInput: true,
            group: '',
            loop: false,
            arrowKeys: true,
            //navigateCaption: true,
            // Boolean, 'closeToModal', 'closeScreenEdge'
            /*navigateArrows: true,*/
            history: false,
            restoreDefaultContent: false,
            // Boolean, Number
            //autoOpen: 0,
            bodyOverflow: false,
            fullscreen: true,
            openFullscreen: true,
            closeOnEscape: true,
            closeButton: true,
            appendTo: 'body', // or false
            appendToOverlay: 'body', // or false
            overlay: true,
            overlayClose: true,
            overlayColor: 'rgba(0, 0, 0, 0.4)',
            timeout: false,
            timeoutProgressbar: false,
            ...obj,
            //pauseOnHover: false,
            //timeoutProgressbarColor: 'rgba(255,255,255,0.5)',
            // comingIn, bounceInDown, bounceInUp, fadeInDown
            // fadeInUp, fadeInLeft, fadeInRight, flipInX
            // bounceInLeft, bounceInRight
            //transitionIn: 'comingIn',
            // comingOut, bounceOutDown, bounceOutUp, fadeOutDown
            // fadeOutUp, , fadeOutLeft, fadeOutRight, flipOutX
            // bounceOutLeft, bounceOutRight
            // transitionOut: 'comingOut',
            /*transitionInOverlay: 'fadeIn',
            transitionOutOverlay: 'fadeOut',*/
            // callback functions
            onOpened: () => {
                this.triggerEvent('OPEN_END')

            },
            onClosed: () => {


                this.triggerEvent('CLOSE_END')

                if (this.destroyOnClose) this.destroy()

            },
        }

        // Open a new in-app browser window 
        $(this._element).iziModal(modalSettings);
        addEventListener('load', () => document.body.append(this._element))

        this.on('OPEN_END', () => {


            let isOpen = () => {
                var state = this.state

                return state.startsWith('open')
            }

            let close = () => this.close()

            /*BackButton.setItem({
                isOpen,
                close
            })*/
        })



    }
    get state() {
        return $(this._element).iziModal('getState');
    }
    destroy() {

        $(this._element).iziModal('destroy');
        this._element.remove()
        this._saveCallback = () => {

        }
    }
    setContent(html) {
        if (typeof html == 'string') {
            $(this._element).iziModal('setContent', html);
        } else {
            var contentElement = this._element.querySelector('.iziModal-content')
            contentElement.appendChild(html)
        }

    }
    open() {



        var zIndex = Number(this.maxZIndex())
        this._element.style.zIndex = zIndex + 2



        $(this._element).iziModal('open');

        var overLay = document.querySelector(".iziModal-overlay:last-of-type")
        overLay.style.zIndex = zIndex + 1
    }
    close() {
        $(this._element).iziModal('close');
    }
    setTitle(title) {
        $(this._element).iziModal('setTitle', title);
    }
    hideHeader() {
        this._element.querySelector(".iziModal-header").style.display = 'none'
    }

    maxZIndex() {
        var elems = document.querySelectorAll('*')
        var max = 2
        elems.forEach(elem => {

            var {
                zIndex
            } = elem.style

            if (zIndex && zIndex >= max) {
                max = zIndex
            }
        })

        return max
    }
}
/*

Example usage:

const modal = new IziModal({
    title: 'My Custom Modal',
    headerColor: '#ff5722',
    width: 800,
    fullscreen: false,
    openFullscreen: false
});

// Set the content of the modal
modal.setContent(`
    <div>
        <h4>Welcome to the Custom Modal</h4>
        <p>This is an example of how to use the IziModal class.</p>
        <button id="saveButton" class="btn green">Save</button>
        <button id="closeButton" class="btn red">Close</button>
    </div>
`);

// Open the modal
modal.open();

*/