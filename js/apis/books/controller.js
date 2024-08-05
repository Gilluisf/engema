class BooksController extends  FirebaseDatabaseFolderController {
  constructor() {
    super()
    this.model = new BooksModel();
    this.view = new BooksView();


    //this.model.listenChange()
    this.model.on('UPDATE', () => this.displayAll());

    this.view.on('ADD', (book) => this.add(book));
    this.view.on('DELETE', (book) => this.delete(book));
  }
}