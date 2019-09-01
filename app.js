function Book(
  title = 'Unknown',
  author = 'Unknown',
  totalPages = 0,
  completedPages = 0,
  completed = false
) {
  this.title = title;
  this.author = author;
  this.totalPages = totalPages;
  this.completedPages = completedPages;
  this.completed = completed;
}

function BookContainer(book) {
  this.element = document.createElement('div');
  this.element.classList.add('book-container');

  // create options element
  this.options = document.createElement('div');
  this.options.classList.add('options');
  // create and add button element
  this.buttonEdit = document.createElement('button');
  this.buttonEdit.classList.add('button');
  this.buttonEdit.classList.add('green-bg');
  this.buttonEdit.textContent = 'Edit';
  this.options.appendChild(this.buttonEdit);
  // create and add button element
  this.buttonRemove = document.createElement('button');
  this.buttonRemove.classList.add('button');
  this.buttonRemove.classList.add('red-bg');
  this.buttonRemove.textContent = 'Remove';
  this.options.appendChild(this.buttonRemove);
  // add options element
  this.element.appendChild(this.options);

  // create content element ! undefined
  this.content = document.createElement('div');
  this.content.classList.add('content');
  // create title h2 element
  this.title = document.createElement('h2');
  this.title.classList.add('title');
  this.title.textContent = book.title;
  this.content.appendChild(this.title);
  // create author h3 element
  this.author = document.createElement('h3');
  this.author.classList.add('author');
  this.author.textContent = book.author;
  this.content.appendChild(this.author);
  // add content element
  this.element.appendChild(this.content);

  // create pages-controller element
  this.pagesController = document.createElement('div');
  this.pagesController.classList.add('pages-controller');
  // create minus button element
  this.buttonPagesSubtract = document.createElement('button');
  this.buttonPagesSubtract.classList.add('button');
  this.buttonPagesSubtract.classList.add('minus-gb');
  this.buttonPagesSubtract.textContent = '-';
  this.pagesController.appendChild(this.buttonPagesSubtract);
  // create complete button element
  this.buttonPagesComplete = document.createElement('button');
  this.buttonPagesComplete.classList.add('button');
  this.buttonPagesComplete.classList.add('check-gb');
  this.buttonPagesComplete.textContent = '✓';
  this.pagesController.appendChild(this.buttonPagesComplete);
  // create add button element
  this.buttonPagesAdd = document.createElement('button');
  this.buttonPagesAdd.classList.add('button');
  this.buttonPagesAdd.classList.add('plus-gb');
  this.buttonPagesAdd.textContent = '+';
  this.pagesController.appendChild(this.buttonPagesAdd);
  // add pages-controller element
  this.element.appendChild(this.pagesController);

  // create pages-count element
  this.pagesCount = document.createElement('div');
  this.pagesCount.classList.add('pages-count');
  // create pages completed h2 element
  this.completedPages = document.createElement('h2');
  this.completedPages.classList.add('completed');
  this.completedPages.textContent = book.completedPages;
  this.pagesCount.appendChild(this.completedPages);
  // create separator span element
  this.separator = document.createElement('span');
  this.separator.classList.add('separator');
  this.separator.textContent = '|';
  this.pagesCount.appendChild(this.separator);
  // create pages total h2 element
  this.totalPages = document.createElement('h2');
  this.totalPages.classList.add('total');
  this.totalPages.textContent = book.totalPages;
  this.pagesCount.appendChild(this.totalPages);
  // add pages-count element
  this.element.appendChild(this.pagesCount);
}

// ref main elements
const libraryContainer = document.querySelector('.library-main');
const buttonAddBook = document.querySelector('.add-button');

// add events
buttonAddBook.addEventListener('click', addBookHandler);

function addBookHandler(e) {
  modalAddWrapper.classList.remove('display-none');
}

// let newBook = new Book('Серега Педор', 'Игорь Мудрый', 512, 64, false);
// const bookWrapper = new BookContainer(newBook);

// libraryContainer.insertBefore(
//   bookWrapper.element,
//   libraryContainer.lastElementChild
// );
