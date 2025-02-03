const myLibrary = [];
const inputButton = document.getElementById('inputButton');

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
    bookDisplay.id = `bookDisplay-${inputArrayPos}`;
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
    readDiv.id = `readDiv-${inputArrayPos}`;
    bookDisplay.appendChild(readDiv);

    // const arrayPosDiv = document.createElement('div');
    // arrayPosDiv.textContent = `Index: ${inputArrayPos}`;
    // bookDisplay.appendChild(arrayPosDiv);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Click here to delete';
    deleteButton.id = `deleteButton-${inputArrayPos}`;
    bookDisplay.appendChild(deleteButton);
    deleteButton.addEventListener('click', function(e) {
        const target = e.target.closest(`#deleteButton-${inputArrayPos}`);
        if (target) {
            deleteBook(inputArrayPos);
        }
    });

    const readButton = document.createElement('button');
    readButton.textContent = 'Click here to change read status';
    readButton.id = `readButton-${inputArrayPos}`;
    bookDisplay.appendChild(readButton);
    readButton.addEventListener('click', function(e) {
        const target = e.target.closest(`#readButton-${inputArrayPos}`);
        if (target) {
            readStatus(inputArrayPos);
        }
    });
}

function deleteBook(inputArrayPos) {
    const displayContainer = document.getElementById('display-container');
    const nodeToDelete = document.getElementById(`bookDisplay-${inputArrayPos}`);
    displayContainer.removeChild(nodeToDelete);
    myLibrary.splice(inputArrayPos, 1);
}

function readStatus(inputArrayPos) {
    const nodeToChange = document.getElementById(`readDiv-${inputArrayPos}`);
    nodeToChange.textContent = nodeToChange.textContent === 'Have you read this book? yes'
    ? 'Have you read this book? no'
    : 'Have you read this book? yes';
}