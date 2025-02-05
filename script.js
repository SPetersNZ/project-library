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

inputButton.addEventListener('click', addBookToLibrary);

// add a book to the myLibrary array
function addBookToLibrary() {
    const { inputTitle, inputAuthor, inputPages, inputRead } = getInputValues();
    const newBook = new Book(inputTitle, inputAuthor, inputPages, inputRead);
    myLibrary.push(newBook);
    displayBooks();
}

// display a book when it gets added to the table
function displayBooks() {
    let tableRowNum = myLibrary.length - 1;
    const { inputTitle, inputAuthor, inputPages, inputRead} = getInputValues();
    const displayTable = document.getElementById('display-table').getElementsByTagName('tbody')[0];
    const newRow = displayTable.insertRow();
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
    readButton.addEventListener('click', () => readStatus(tableRowNum));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Click here to delete';
    deleteButton.id = `deleteButton-${tableRowNum}`;
    const deleteButtonCell = newRow.insertCell(5);
    deleteButtonCell.append(deleteButton);
    deleteButton.addEventListener('click', () => deleteBook(newRow));  // changed from tableRowNum to newRow
}

// change the read status of a book that has already been added
function readStatus(tableRowNum) {
    const cellToChange = document.getElementById(`readCell-${tableRowNum}`);
    cellToChange.textContent = cellToChange.textContent === 'yes' ? 'no' : 'yes';
}

// delete a book from the table
function deleteBook(rowToDelete) {
    const rowIndex = rowToDelete.rowIndex - 1;
    myLibrary.splice(rowIndex, 1);
    rowToDelete.remove();
    renameRows();
}

// function to ensure that the rows are named in their correct order
// ensures that button functions will match to the correct rows
function renameRows() {
    const rows = document.querySelectorAll('#display-table tbody tr');
    rows.forEach((row, index) => {
        row.id = `tableRowNum-${index}`;
        const readCell = row.cells[3];
        readCell.id = `readCell-${index}`;
    
        const buttons = row.querySelectorAll('button');
        
        const readButton = Array.from(buttons).find(btn => btn.id.startsWith('readButton-'));
        if (readButton) {
            readButton.id = `readButton-${index}`;
            // readButton.removeEventListener('click', () => readStatus);
            // readButton.addEventListener('click', () => readStatus(index));
            readButton.replaceWith(readButton.cloneNode(true));
            const newReadButton = document.getElementById(`readButton-${index}`);
            newReadButton.addEventListener('click', () => readStatus(index));
        }
        
        const deleteButton = Array.from(buttons).find(btn => btn.id.startsWith('deleteButton-'));
        if (deleteButton) {
            deleteButton.id = `deleteButton-${index}`;
            // deleteButton.removeEventListener('click', () => deleteBook);
            // deleteButton.addEventListener('click', () => deleteBook(row));
            deleteButton.replaceWith(deleteButton.cloneNode(true));
            const newDeleteButton = document.getElementById(`deleteButton-${index}`);
            newDeleteButton.addEventListener('click', () => deleteBook(row));
        }
    });
}