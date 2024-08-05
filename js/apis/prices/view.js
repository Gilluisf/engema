class PricesView  extends  FirebaseDatabaseFolderView {
    itemsContainer = document.querySelector("#prices tbody")
    form = document.querySelector("#prices form")
    constructor() {
        super()

        this.form.addEventListener('submit', () => {
            var subject = $(this.form).serializeJSON()

            this.triggerEvent('ADD', subject)
        })

    }
    displayAll(grades) {
        this.itemsContainer.innerHTML = ''
        for (var grade in grades) {

            var subjects = Object.keys(grades[grade])

            for (var subject of subjects) {
                var price = grades[grade][subject].price

                this.display(grade, subject, price)
            }
        }
    }

    display(grade, subject, price) {
        var view = new PriceTableRow(grade, subject, price)
        view.show()
        
        view.on('DELETE', () => {
            this.triggerEvent('DELETE',{grade,subject}) 
        })
    }

}