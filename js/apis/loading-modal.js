class LoadingModal {
    static show(options) {
        $('body').loadingModal({
            text:'Carregando...',
            ...(options || {})
        });
        $('body').loadingModal('animation', 'fadingCircle')
    }

    static hide() {
        $('body').loadingModal('destroy')
    }
}





