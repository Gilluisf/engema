class SubscriptionsController extends FirebaseDatabaseFolderController {
   
    constructor() {
         super()
        this.model = new SubscriptionsModel();
        this.view = new SubscriptionsView();


        
        this.model.on('UPDATE', () => this.displayAll())
        this.view.on('APPROVE', data => this.approve(data));
        this.view.on('PRINT', async (subscription) => {
            this.view.showLoader()
                        
            try {

                await this.view.print(subscription)

            } catch (e) {

                this.view.showError('Erro '+ e)
                
            }

            this.view.hideLoader()
            

        })
        this.view.on('DELETE', (subscription) => this.delete(subscription));
        
    }

    /*async print(data){

    }*/

    async approve(subscription) {
        try {
            this.view.showLoader();
            await this.model.approve(subscription);
            this.view.showMessage('Inscrição aprovada')
        } catch (error) {
            console.error(error)
            this.view.showError(error);
        }
        this.view.hideLoader();
    }
}

