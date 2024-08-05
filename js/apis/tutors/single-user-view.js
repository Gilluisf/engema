class SingleUserView extends EasyEvents{
    constructor() {

        super()

        this._containerElement = this._createContainer();

        this.deleteButton.addEventListener('click', () => this.triggerEvent('DELETE'));

        //this.editButton.addEventListener('click', () => this.triggerEvent('EDIT'));
    }

    get deleteButton() {
        return this._containerElement.querySelector('.btn.red');
    }
    // Method to create the container element for the payment approval view with given details
    _createContainer() {
        const container = document.createElement('tr');

        container.innerHTML = `
            <td class="name"></td>
            <td class="email"></td>
            <td class="password"></td>
            <td class="type"></td>
            <td>
                <button class="btn waves-effect waves-light red" type="button">Remover</button>
            </td>
        `;

        return container;
    }
    show() {
        var tableBody = document.querySelector("#users  tbody")
        tableBody.appendChild(this._containerElement)
    }
    set email(value) {
        var emailElement = this._containerElement.querySelector('.email')
        emailElement.textContent = value;
    }
    set name(value) {
        var nameElement = this._containerElement.querySelector('.name')
        nameElement.textContent = value;
    }
    set password(value) {
        var passwordElement = this._containerElement.querySelector('.password')
        passwordElement.textContent = value;
    }

    set type(value) {
        var typeElement = this._containerElement.querySelector('.type')
        var text = {
            tutor:'Tutor',
            student:'Estudante'
        }
        typeElement.innerHTML = text[value]
    }

}