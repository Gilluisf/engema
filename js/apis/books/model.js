class BooksModel extends FirebaseDatabaseFolderModel {
  folder = 'books'
  constructor() {
    super()

  }
  async getAll() {

    var snapShot = await (this.folderRefFiltered || this.folderRef).once('value')
    var books = snapShot.toJSON()

    var filteredBooks = {}
    for (let key in books) {
      let book = books[key]
      if (book.grade == this.grade || !this.grade) {
        filteredBooks[key] = book
      }
    }

    return filteredBooks
  }
}
/*
// Create a new instance of the BooksModel
const booksModel = new BooksModel();

// Add a book to the database
const bookToAdd = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  genre: "Fiction",
  year: 1925
};
booksModel.addBook(bookToAdd);

// Get all books from the database
const allBooks = booksModel.getAll();
console.log(allBooks);

// Update a book in the database
const bookToUpdate = {
  id: 1,
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  genre: "Fiction",
  year: 1960
};
booksModel.updateBook(bookToUpdate);

// Delete a book from the database
const bookToDeleteId = 2;
booksModel.deleteBook(bookToDeleteId);
*/