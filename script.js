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
    tableRowNum = myLibrary.length - 1;
    return { inputTitle, inputAuthor, inputPages, inputRead, tableRowNum};
}

inputButton.addEventListener('click', addBookToLibrary);

function addBookToLibrary() {
    const { inputTitle, inputAuthor, inputPages, inputRead, tableRowNum} = getInputValues();
    const newBook = new Book(inputTitle, inputAuthor, inputPages, inputRead, tableRowNum);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const { inputTitle, inputAuthor, inputPages, inputRead, tableRowNum} = getInputValues();
    const displayTable = document.getElementById('display-table');
    const newRow = displayTable.insertRow(tableRowNum + 1);
    newRow.id = `tableRowNum-${tableRowNum}`;

    const titleCell = newRow.insertCell(0);
    titleCell.textContent = `${inputTitle}`;

    const authorCell = newRow.insertCell(1);
    authorCell.textContent = `${inputAuthor}`;

    const pagesCell = newRow.insertCell(2);
    pagesCell.textContent = `${inputPages}`;

    const readCell = newRow.insertCell(3);
    readCell.textContent = `${inputRead}`;
    readCell.id = `readCell-${tableRowNum}`;

    const readButton = document.createElement('button');
    readButton.textContent = 'Click here to change read status';
    readButton.id = `readButton-${tableRowNum}`;
    const readButtonCell = newRow.insertCell(4);
    readButtonCell.append(readButton);
    readButton.addEventListener('click', function(e) {
    const target = e.target.closest(`#readButton-${tableRowNum}`);
        if (target) {
            readStatus(tableRowNum);
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Click here to delete';
    deleteButton.id = `deleteButton-${tableRowNum}`;
    const deleteButtonCell = newRow.insertCell(5);
    deleteButtonCell.append(deleteButton);
    deleteButton.addEventListener('click', function(e) {
    const target = e.target.closest(`#deleteButton-${tableRowNum}`);
        if (target) {
            deleteBook(tableRowNum);
        }
    });
}

function readStatus(tableRowNum) {
    const cellToChange = document.getElementById(`readCell-${tableRowNum}`);
    cellToChange.textContent = cellToChange.textContent === 'yes' ? 'no' : 'yes';
}

function deleteBook(tableRowNum) {
    const rowToDelete = document.getElementById(`tableRowNum-${tableRowNum}`);
    rowToDelete.parentNode.removeChild(rowToDelete);
    myLibrary.splice(tableRowNum, 1);
}