class BookView extends EasyEvents {
    link
    // Private variable to store the container element of the book view
    _containerElement;
    // Constructor to create a new BookView instance with given book details
    constructor() {
        super();
        this._containerElement = this._createContainerElement();
        this.readButton.addEventListener('click', () => this.read());
        this.deleteButton.addEventListener('click', () => {
            var text = 'Tens certeza que desejas eliminar este livro?'
            if (confirm(text)) this.triggerEvent('DELETE')
        });
    }
    //Method to create the container element for the book view with given details
    _createContainerElement() {
        const container = document.createElement('div');
        container.className = 'col s12 m6';

        container.innerHTML =
            `<div class="card small" style="width:200pt">
                <div class="card-image" style="max-height: 50%">
                    <img src="">
                </div>
                <div class="card-content">
                    <span class="card-title"></span>
                    <p><a href="#" class="grade"></a></p>
                </div>
                <div class="card-action">
                    <a class="btn" href="#">Ler</a>
                    <a class="btn red" href="#">Eliminar</a>
                </div>
            </div>
        `;

        return container;
    }


    // Getter method to retrieve the title element of the book view
    get titleElement() {
        return this._containerElement.querySelector('.card-title');
    }

    // Setter method to set the title of the book view
    set title(title) {
        this.titleElement.textContent = title;
    }
    get title() {
        return this.titleElement.textContent
    }
    // Getter method to retrieve the description element of the book view
    get descriptionElement() {
        return this._containerElement.querySelector('.card-content p');
    }

    // Setter method to set the description of the book view
    set description(description) {
        this.descriptionElement.textContent = description;
    }

    // Getter method to retrieve the read button element of the book view
    get readButton() {
        return this._containerElement.querySelector('.btn');
    }

    // Getter method to retrieve the delete button element of the book view
    get deleteButton() {
        return this._containerElement.querySelector('.btn.red');
    }

    set showDeleteButton(show) {
        this.deleteButton.style.display = show ? '' : 'none'
    }
    show() {
        document.querySelector("#library .container").appendChild(this._containerElement)
    }
    set grade(grade) {
        var gradeElement = this._containerElement.querySelector('.grade')
        gradeElement.innerHTML = `${grade}ª Classe`
    }
    set cover(cover) {
        var image = this._containerElement.querySelector('img')
        image.src = cover

    }

    read() {
        window.open(this.link)

    }



}



/*document.querySelector('[type=file]').addEventListener('change', async (event) => {
    try {
        const base64 = await convertImageToBase64(event.target);
        console.log(base64);
    } catch (error) {
        console.error(error);
    }
});*/