class AbsctractView extends EasyEvents {
    showMessage(message) {
        M.toast({
            html: message
        });
    }
    showError(message) {
        message += '<button class="btn-flat toast-action">!</button>'
        M.toast({
            html: message,
            classes: 'red'
        });
    }

    showLoader(text = 'Carregando...', animation = 'fadingCircle') {
        let element = this.loaderContainer || this.itemsContainer || 'body'
        $(element).loadingModal({
            text
        });
        $(element).loadingModal('animation', animation)
    }
    hideLoader() {
        let element = this.loaderContainer || this.itemsContainer || 'body'
        $(element).loadingModal('destroy')
    }
}