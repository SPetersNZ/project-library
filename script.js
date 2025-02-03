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
    const displayTable = document.getElementById('display-table');
    const newRow = displayTable.insertRow(inputArrayPos + 1);

    const titleCell = newRow.insertCell(0);
    titleCell.textContent = `${inputTitle}`;

    const authorCell = newRow.insertCell(1);
    authorCell.textContent = `${inputAuthor}`;

    const pagesCell = newRow.insertCell(2);
    pagesCell.textContent = `${inputPages}`;

    const readCell = newRow.insertCell(3);
    readCell.textContent = `${inputRead}`;

    const readButton = document.createElement('button');
    readButton.textContent = 'Click here to change read status';
    readButton.id = `readButton-${inputArrayPos}`;
    const readButtonCell = newRow.insertCell(4);
    readButtonCell.append(readButton);
    readButton.addEventListener('click', function(e) {
        const target = e.target.closest(`#readButton-${inputArrayPos}`);
        if (target) {
            deleteBook(inputArrayPos);
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Click here to delete';
    deleteButton.id = `deleteButton-${inputArrayPos}`;
    const deleteButtonCell = newRow.insertCell(5);
    deleteButtonCell.append(deleteButton);
    deleteButton.addEventListener('click', function(e) {
    const target = e.target.closest(`#deleteButton-${inputArrayPos}`);
    if (target) {
            deleteBook(inputArrayPos);
        }
    });
}

function readStatus(inputArrayPos) {
    const nodeToChange = document.getElementById(`readDiv-${inputArrayPos}`);
    nodeToChange.textContent = nodeToChange.textContent === 'Have you read this book? yes'
    ? 'Have you read this book? no'
    : 'Have you read this book? yes';
}

function deleteBook(inputArrayPos) {
    const displayContainer = document.getElementById('display-container');
    const nodeToDelete = document.getElementById(`bookDisplay-${inputArrayPos}`);
    displayContainer.removeChild(nodeToDelete);
    myLibrary.splice(inputArrayPos, 1);
}