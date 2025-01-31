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
    return { inputTitle, inputAuthor, inputPages, inputRead};
}

inputButton.addEventListener("click", addBookToLibrary);

function addBookToLibrary() {
    
    const { inputTitle, inputAuthor, inputPages, inputRead} = getInputValues();

    const newBook = new Book(inputTitle, inputAuthor, inputPages, inputRead);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    
    const { inputTitle, inputAuthor, inputPages, inputRead} = getInputValues();

    const displayContainer = document.getElementById('display-container');
    const titleDiv = document.createElement('div');
    titleDiv.textContent += inputTitle;
    displayContainer.appendChild(titleDiv);
}