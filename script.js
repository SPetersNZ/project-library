const myLibrary = [];
const inputButton = document.getElementById('inputButton');
// const deleteButton = document.getElementsByClassName('deleteButton');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function getInputValues () {
    const inputTitle = document.getElementById('title').value;
    const inputAuthor = document.getElementById('author').value;
    const inputPages = document.getElementById('pages').value;
    const inputRead = document.querySelector('input[name="read"]:checked').value;
    inputArrayPos = myLibrary.length - 1;
    return { inputTitle, inputAuthor, inputPages, inputRead, inputArrayPos};
}

inputButton.addEventListener('click', addBookToLibrary);

function addBookToLibrary() {
    const { inputTitle, inputAuthor, inputPages, inputRead, inputArrayPos} = getInputValues();
    const newBook = new Book(inputTitle, inputAuthor, inputPages, inputRead, inputArrayPos);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const { inputTitle, inputAuthor, inputPages, inputRead, inputArrayPos} = getInputValues();
    const displayContainer = document.getElementById('display-container');
    const bookDisplay = document.createElement('div');
    bookDisplay.id = `bookDisplay[${inputArrayPos}]`;
    const titleDiv = document.createElement('div');
    titleDiv.textContent = `Title: ${inputTitle}`;
    displayContainer.appendChild(bookDisplay);
    bookDisplay.appendChild(titleDiv);

    const authorDiv = document.createElement('div');
    authorDiv.textContent = `Author: ${inputAuthor}`;
    bookDisplay.appendChild(authorDiv);

    const pagesDiv = document.createElement('div');
    pagesDiv.textContent = `Number of pages: ${inputPages}`;
    bookDisplay.appendChild(pagesDiv);

    const readDiv = document.createElement('div');
    readDiv.textContent = `Have you read this book? ${inputRead}`;
    bookDisplay.appendChild(readDiv);

    // code below to be deleted - for testing
    const arrayPosDiv = document.createElement('div');
    arrayPosDiv.textContent = `Index: ${inputArrayPos}`;
    bookDisplay.appendChild(arrayPosDiv);
    // code above to be delete - for testing

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Click here to delete';
    deleteButton.id = `deleteButton-${inputArrayPos}`;
    // deleteButton.className = 'deleteButton';
    bookDisplay.appendChild(deleteButton);
    deleteButton.addEventListener('click', function(e) {
        const target = e.target.closest(`#deleteButton-${inputArrayPos}`);
        if (target) {
            deleteBook(inputArrayPos);
        }
    });
}

function deleteBook(inputArrayPos) {
    console.log(`testing, button[${inputArrayPos}]`);
}