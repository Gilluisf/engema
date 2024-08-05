class SingleSubscriptionView extends EasyEvents {
    // Constructor to create a new PaymentApprovalView instance with given payment details
    constructor(data) {
        super()
        this._containerElement = this._createContainer(data);

        this.approveButton.addEventListener('click', () => this.triggerEvent('APPROVE'));

        this.deleteButton.addEventListener('click', () => {
            var text = 'Tens certeza que desejas eliminar este livro inscrição?'
            if (confirm(text)) this.triggerEvent('DELETE')
        });

        this.printButton.addEventListener('click', () => this.triggerEvent('PRINT'));

        if (data.state == 'approved') {
            this.deleteButton.parentElement.style.display = 'none'
            this.approveButton.parentElement.style.display = 'none'
            this._containerElement.insertAdjacentHTML('beforeend', `<td>
                <a class="waves-effect waves-light btn">Aprovado</a>
            </td>`)
        }

    }

    get deleteButton() {
        return this._containerElement.querySelector('.btn.red');
    }
    get printButton() {
        return this._containerElement.querySelector('.btn.brown');
    }
    get approveButton() {
        return this._containerElement.querySelector('.btn.green');
    }
    // Method to create the container element for the payment approval view with given details
    _createContainer(data) {

        var {
            phoneNumber,
            price,
            timestamp,
            grade
        } = data
        const container = document.createElement('tr');
        var date = new Date(timestamp).toLocaleString()
        container.innerHTML = `
            <td class="phone-number">${phoneNumber}</td>
            <td class="price">${price} MT</td>
            <td class="date">${date}</td>
            <td>
                <a class="btn waves-effect waves-light green">Aprovar</a>
            </td>
            <td>
                <a class="btn waves-effect waves-light red">Eliminar</a>
            </td>
            <td>
                <a class="btn waves-effect waves-light brown">Imprimir</a>
            </td>
        `;

        return container;
    }
    show() {
        var tableBody = document.querySelector("#subscriptions  tbody")
        tableBody.appendChild(this._containerElement)
    }
}