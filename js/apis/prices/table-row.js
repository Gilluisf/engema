class PriceTableRow extends EasyEvents {
    // Constructor to create a new PriceView instance with given subject details
    constructor(grade, name, price) {
        super()
        this._containerElement = this._createContainer(grade, name, price);

        this.deleteButton.addEventListener('click', () => this.triggerEvent('DELETE'));
    }

    // Method to create the container element for the subject price view with given details
    _createContainer(grade, name, price) {
        const container = document.createElement('tr');

        container.innerHTML = `
            <td class="grade">${grade}ª</td>
            <th class="name">${name}</th>
            <td class="price">${price} MT</td>
            <td>
                <a class="btn red">Eliminar</a>
            </td>
         `;

        return container;
    }
    get deleteButton() {
        return this._containerElement.querySelector('.btn.red');
    }
    set price(price) {
        var priceElem = this._containerElement.querySelector('.price')
        priceElem.innerHTML = price + ' MT'
    }
    // Method to handle the delete action for the subject
    delete() {
        this._containerElement.remove();
        // Additional logic to handle deletion of the subject
    }
    show() {
        var tableBody = document.querySelector("#prices  tbody")
        tableBody.appendChild(this._containerElement)
    }

}