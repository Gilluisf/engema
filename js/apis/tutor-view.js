class TutorView extends EasyEvents{
    // Constructor to create a new PaymentApprovalView instance with given payment details
    constructor() {
        
        super()

        this._containerElement = this._createContainer();
         
        this.deleteButton.addEventListener('click', () => this.triggerEvent('DELETE'));

        this.editButton.addEventListener('click', () => this.triggerEvent('EDIT'));

        this.seeMessagesButton.addEventListener('click', () => this.triggerEvent('SEE_MESSAGES'));
    }

    get deleteButton(){
        return this._containerElement.querySelector('.btn.red');
    }
    get editButton(){
        return this._containerElement.querySelector('.btn.blue');
    }
    get seeMessagesButton(){
        return this._containerElement.querySelector('.btn.brown');
    }
    // Method to create the container element for the payment approval view with given details
    _createContainer() {
        const container = document.createElement('tr');

        container.innerHTML =`
            <td></td>
            <td></td>
            <td></td>
            <td>
                <button class="btn waves-effect waves-light blue" type="button">Editar</button>
            </td>

            <td>
                <button class="btn waves-effect waves-light brown" type="button">Ver mensagens</button>
            </td>

            <td>
                <button class="btn waves-effect waves-light red" type="button">Remover</button>
            </td>
        `;

        return container;
    }
    show(){
        var tableBody = document.querySelector("#tutors  tbody")
        tableBody.appendChild(this._containerElement)
    }
}

