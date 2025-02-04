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
    const { inputTitle, inputAuthor, inputPages, inputRead} = getInputValues();
    const newBook = new Book(inputTitle, inputAuthor, inputPages, inputRead);
    myLibrary.push(newBook);
    displayBooks();
}

// display a book when it gets added to the table
function displayBooks() {
    let tableRowNum = myLibrary.length;
    const { inputTitle, inputAuthor, inputPages, inputRead} = getInputValues();
    const displayTable = document.getElementById('display-table');
    const newRow = displayTable.insertRow(tableRowNum);
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

// change the read status of a book that has already been added
function readStatus(tableRowNum) {
    const cellToChange = document.getElementById(`readCell-${tableRowNum}`);
    cellToChange.textContent = cellToChange.textContent === 'yes' ? 'no' : 'yes';
}

// delete a book from the table
function deleteBook(tableRowNum) {
    const rowToDelete = document.getElementById(`tableRowNum-${tableRowNum}`);
    rowToDelete.parentNode.removeChild(rowToDelete);
    if (tableRowNum == myLibrary.length) {
        myLibrary.pop();
    } else {
        myLibrary.splice(tableRowNum, 1);
    }
    renameRows();
}

// function to ensure that the rows are named in their correct order
// ensures that button functions will match to the correct rows
function renameRows () {
    const row = document.querySelectorAll('#display-table tr');
    const readCellIndex = 3;
    row.forEach((row, index) => {
        row.id = `tableRowNum-${index}`;
        row.cells[readCellIndex].id = `readCell-${index}`;
        const buttons = row.querySelectorAll('button');
        const readButton = Array.from(buttons).find(btn => btn.id.startsWith('readButton-'));
        if(readButton) {
            readButton.id = `readButton-${index}`;
            readButton.addEventListener('click', function(e) {
            const target = e.target.closest(`#readButton-${index}`);
                if (target) {
                    readStatus(index);
                }
            });
        }
        const deleteButton = Array.from(buttons).find(btn => btn.id.startsWith('deleteButton-'));
        if (deleteButton) {
            deleteButton.id = `deleteButton-${index}`;
            deleteButton.addEventListener('click', function(e) {
            const target = e.target.closest(`#deleteButton-${index}`);
                if (target) {
                    deleteBook(index);
                }
            });
        }
    });
}