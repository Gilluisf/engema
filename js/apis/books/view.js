class BooksView extends FirebaseDatabaseFolderView {
  showDeleteBookButton = true
  get itemsContainer() {
    return document.querySelector('#library .container');
  }
  get addBookButton() {
    return document.querySelector("#add-book-btn");
  }

  constructor() {

    var options = {
      title: 'Adicionar livro',
      elementID: 'add-book',
      iframeURL: 'add-book.html',
      fullscreen: false,
      openFullscreen: false
    }

    var addBookModal = new IframeModal(options)
    //addTutorModal.setTitle('Revisar topicos')
    addBookModal.destroyOnClose = false
    addBookModal.on('MESSAGE', (data) => {

      this.triggerEvent('ADD', data)

    })
    super();
    this.addBookButton.addEventListener('click', () => addBookModal.open())


  }

  display(book, key) {

    let {
      title,
      cover,
      grade,
      link
    } = book
    const bookView = new BookView();
    bookView.title = title;
    bookView.link = link
    bookView.cover = cover;
    bookView.showDeleteButton = this.showDeleteBookButton
    bookView.grade = grade
    bookView.show();
    return bookView
  }
}
/*
// Create a new instance of the BooksView
const booksView = new BooksView();

// Render the view with a list of books
const books = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { title: "To Kill a Mockingbird", author: "Harper Lee" },
  { title: "1984", author: "George Orwell" }
];
booksView.displayAll(books);

// Update the view with a new list of books
const updatedBooks = [
  { title: "Pride and Prejudice", author: "Jane Austen" },
  { title: "Moby-Dick", author: "Herman Melville" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger" }
];

// Clear the view
booksView.clear();*/