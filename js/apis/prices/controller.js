class PricesController extends  FirebaseDatabaseFolderController{

    constructor() {
        super()
        this.model = new PricesModel()
        this.view = new PricesView()

    }
    init(){
        
        this.model.listenChange()
        
        this.model.on('UPDATE', (data) => this.displayAll(data))

        this.view.on('ADD', (data) => this.add(data))

        this.view.on('DELETE', (grade, subject) => this.delete(grade, subject))
    }

}





/*
var grades = await PriceModel.getAll()
*/

//let controller = new PriceController;
