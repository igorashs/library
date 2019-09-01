'use strict';
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

function ModalBookFactory(modalType) {
  if (modalType === 'add') {
    this.modalType = modalType;
    // create wrapper element
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('modal-add-wrapper');
    this.wrapper.classList.add('display-none');

    // create modal-add element
    this.element = document.createElement('div');
    this.element.classList.add('modal-add');

    // create modal-title element
    this.modalTitle = document.createElement('div');
    this.modalTitle.classList.add('modal-title');
    // create title h2 element
    this.title = document.createElement('h2');
    this.title.textContent = 'Add New Book';
    // add title element
    this.modalTitle.appendChild(this.title);
    // add modal-title element
    this.element.appendChild(this.modalTitle);

    // create content element
    this.content = document.createElement('div');
    this.content.classList.add('content');
    // create book title element
    this.bookTitleElement = document.createElement('div');
    this.bookTitleElement.classList.add('element');
    // create input book-title
    this.bookTitleInput = document.createElement('input');
    this.bookTitleInput.classList.add('input');
    this.bookTitleInput.setAttribute('type', 'text');
    this.bookTitleInput.setAttribute('id', 'book-add-title');
    this.bookTitleInput.setAttribute('required', '');
    this.bookTitleInput.validated = false;
    // add input
    this.bookTitleElement.appendChild(this.bookTitleInput);
    // create label
    this.bookTitleLabel = document.createElement('label');
    this.bookTitleLabel.classList.add('title');
    this.bookTitleLabel.setAttribute('for', 'book-add-title');
    this.bookTitleLabel.textContent = 'Title';
    // add label
    this.bookTitleElement.appendChild(this.bookTitleLabel);
    // add book title element
    this.content.appendChild(this.bookTitleElement);

    // create book author element
    this.bookAuthorElement = document.createElement('div');
    this.bookAuthorElement.classList.add('element');
    // create input book-author
    this.bookAuthorInput = document.createElement('input');
    this.bookAuthorInput.classList.add('input');
    this.bookAuthorInput.setAttribute('type', 'text');
    this.bookAuthorInput.setAttribute('id', 'book-add-author');
    this.bookAuthorInput.setAttribute('required', '');
    this.bookAuthorInput.validated = false;
    // add input
    this.bookAuthorElement.appendChild(this.bookAuthorInput);
    // create label
    this.bookAuthorLabel = document.createElement('label');
    this.bookAuthorLabel.classList.add('title');
    this.bookAuthorLabel.setAttribute('for', 'book-add-author');
    this.bookAuthorLabel.textContent = 'Author';
    // add label
    this.bookAuthorElement.appendChild(this.bookAuthorLabel);
    // add book author element
    this.content.appendChild(this.bookAuthorElement);

    // create book total pages element
    this.bookTotalPagesElement = document.createElement('div');
    this.bookTotalPagesElement.classList.add('element');
    // create input book-total-pages
    this.bookTotalPagesInput = document.createElement('input');
    this.bookTotalPagesInput.classList.add('input');
    this.bookTotalPagesInput.classList.add('number');
    this.bookTotalPagesInput.setAttribute('type', 'text');
    this.bookTotalPagesInput.setAttribute('id', 'book-add-total-pages');
    this.bookTotalPagesInput.setAttribute('required', '');
    this.bookTotalPagesInput.validated = false;
    // add input
    this.bookTotalPagesElement.appendChild(this.bookTotalPagesInput);
    // create label
    this.bookTotalPagesLabel = document.createElement('label');
    this.bookTotalPagesLabel.classList.add('title');
    this.bookTotalPagesLabel.setAttribute('for', 'book-add-total-pages');
    this.bookTotalPagesLabel.textContent = 'Total pages';
    // add label
    this.bookTotalPagesElement.appendChild(this.bookTotalPagesLabel);
    // add book author element
    this.content.appendChild(this.bookTotalPagesElement);

    // create book completed pages element
    this.bookCompletedPagesElement = document.createElement('div');
    this.bookCompletedPagesElement.classList.add('element');
    // create check pages element
    this.bookCompletedPagesCheckElement = document.createElement('div');
    this.bookCompletedPagesCheckElement.classList.add('completed-check');

    // create input book-completed-pages
    this.bookCompletedPagesInput = document.createElement('input');
    this.bookCompletedPagesInput.classList.add('input');
    this.bookCompletedPagesInput.classList.add('number');
    this.bookCompletedPagesInput.setAttribute('type', 'text');
    this.bookCompletedPagesInput.setAttribute('id', 'book-add-completed-pages');
    this.bookCompletedPagesInput.setAttribute('required', '');
    this.bookCompletedPagesInput.validated = false;
    // add input
    this.bookCompletedPagesCheckElement.appendChild(
      this.bookCompletedPagesInput
    );
    // create label
    this.bookCompletedPagesLabel = document.createElement('label');
    this.bookCompletedPagesLabel.classList.add('title');
    this.bookCompletedPagesLabel.setAttribute(
      'for',
      'book-add-completed-pages'
    );
    this.bookCompletedPagesLabel.textContent = 'Completed pages';
    // add label
    this.bookCompletedPagesCheckElement.appendChild(
      this.bookCompletedPagesLabel
    );
    // create check input
    this.bookCompleted = document.createElement('input');
    this.bookCompleted.classList.add('input');
    this.bookCompleted.classList.add('check');
    this.bookCompleted.setAttribute('type', 'checkbox');
    // add check input
    this.bookCompletedPagesCheckElement.appendChild(this.bookCompleted);
    // add completed pages check element
    this.bookCompletedPagesElement.appendChild(
      this.bookCompletedPagesCheckElement
    );
    // add book author element
    this.content.appendChild(this.bookCompletedPagesElement);
    // add content element
    this.element.appendChild(this.content);

    // create options element
    this.options = document.createElement('div');
    this.options.classList.add('options');

    // create cancel button
    this.buttonCancel = document.createElement('button');
    this.buttonCancel.classList.add('button');
    this.buttonCancel.classList.add('red-bg');
    this.buttonCancel.textContent = 'Cancel';
    // add cancel button
    this.options.appendChild(this.buttonCancel);

    // create add button
    this.buttonAdd = document.createElement('button');
    this.buttonAdd.classList.add('button');
    this.buttonAdd.classList.add('green-bg');
    this.buttonAdd.textContent = 'Add';
    // add cancel button
    this.options.appendChild(this.buttonAdd);

    // add options element
    this.element.appendChild(this.options);

    // add element
    this.wrapper.appendChild(this.element);

    // events

    // disable modal
    this.buttonCancel.addEventListener('click', () => this.off());

    // add new book
    this.buttonAdd.addEventListener('click', () => {
      if (this.validate()) {
        let newBook = new Book(
          this.bookTitleInput.value,
          this.bookAuthorInput.value,
          +this.bookTotalPagesInput.value,
          +this.bookCompletedPagesInput.value,
          this.bookCompleted.checked
        );
        let newBookWrapper = new BookContainer(newBook);
        libraryContainer.insertBefore(
          newBookWrapper.element,
          libraryContainer.lastElementChild
        );
        this.clearAllInputs();
        this.off();
      }
    });
    // validation
    // validation on title input
    this.bookTitleInput.addEventListener('input', (e) => {
      if (
        !!this.bookTitleInput.value &&
        this.bookTitleInput.value.length <= 50
      ) {
        this.changeToValid(this.bookTitleInput, this.bookTitleLabel, 'Title');
      } else {
        this.changeToNotValid(
          this.bookTitleInput,
          this.bookTitleLabel,
          'Title cannot be empty and length must be less than 50'
        );
      }
    });
    // validation on author input
    this.bookAuthorInput.addEventListener('input', (e) => {
      if (
        !!this.bookAuthorInput.value &&
        this.bookAuthorInput.value.length <= 30
      ) {
        this.changeToValid(
          this.bookAuthorInput,
          this.bookAuthorLabel,
          'Author'
        );
      } else {
        this.changeToNotValid(
          this.bookAuthorInput,
          this.bookAuthorLabel,
          'Author cannot be empty and length must be less than 30'
        );
      }
    });
    // validation total pages
    this.bookTotalPagesInput.addEventListener('input', (e) => {
      if (
        !!this.bookTotalPagesInput.value &&
        /^\d+$/g.test(this.bookTotalPagesInput.value) &&
        +this.bookTotalPagesInput.value > 0 &&
        +this.bookTotalPagesInput.value <= 9999999
      ) {
        this.changeToValid(
          this.bookTotalPagesInput,
          this.bookTotalPagesLabel,
          'Total pages'
        );
      } else {
        this.changeToNotValid(
          this.bookTotalPagesInput,
          this.bookTotalPagesLabel,
          'Total pages number should be more than 0 and less than 9999999'
        );
      }
    });
  } // this is end of if btw
}
// create function for modals
ModalBookFactory.prototype.on = function() {
  if (this.wrapper) this.wrapper.classList.remove('display-none');
};
ModalBookFactory.prototype.off = function() {
  if (this.wrapper) this.wrapper.classList.add('display-none');
};
ModalBookFactory.prototype.insertInBody = function() {
  if (this.wrapper) document.body.appendChild(this.wrapper);
};
ModalBookFactory.prototype.clearAllInputs = function() {
  if (this.modalType === 'add') {
    this.clearInput(this.bookTitleInput, this.bookTitleLabel, 'Title');
    this.clearInput(this.bookAuthorInput, this.bookAuthorLabel, 'Author');
    this.clearInput(
      this.bookTotalPagesInput,
      this.bookTotalPagesLabel,
      'Total pages'
    );

    // this.bookTotalPagesInput.value = '';
    this.bookCompletedPagesInput.value = '';
    this.bookCompleted.checked = false;
  }
};
ModalBookFactory.prototype.clearInput = function(input, label, defaultValue) {
  input.value = '';
  input.classList.remove('input-validated');
  input.classList.remove('input-not-validated');
  label.classList.remove('validation-message');
  label.textContent = defaultValue;
  input.validated = false;
};
ModalBookFactory.prototype.changeToValid = function(input, label, message) {
  input.classList.remove('input-not-validated');
  input.classList.add('input-validated');
  label.classList.remove('validation-message');
  label.textContent = message;
  input.validated = true;
};
ModalBookFactory.prototype.changeToNotValid = function(input, label, message) {
  input.classList.add('input-not-validated');
  input.classList.remove('input-validated');
  label.classList.add('validation-message');
  label.textContent = message;
  input.validated = false;
};
ModalBookFactory.prototype.validate = function() {
  if (this.wrapper && this.modalType === 'add') {
    // check for empty
    if (!this.bookTitleInput.validated) {
      this.changeToNotValid(
        this.bookTitleInput,
        this.bookTitleLabel,
        'Title cannot be empty and length must be less than 50'
      );
    }
    if (!this.bookAuthorInput.validated) {
      this.changeToNotValid(
        this.bookAuthorInput,
        this.bookAuthorLabel,
        'Author cannot be empty and length must be less than 30'
      );
    }
    if (!this.bookTotalPagesInput.validated) {
      this.changeToNotValid(
        this.bookTotalPagesInput,
        this.bookTotalPagesLabel,
        'Total pages number should be more than 0 and less than 9999999'
      );
    }

    if (
      this.bookTitleInput.validated &&
      this.bookAuthorInput.validated &&
      this.bookTotalPagesInput.validated
    ) {
      return true;
    }
  }
};

// ref main elements
const libraryContainer = document.querySelector('.library-main');
const buttonAddBook = document.querySelector('.add-button');
let addModal = new ModalBookFactory('add');

// append to the end of body
addModal.insertInBody();

// add events
buttonAddBook.addEventListener('click', addBookHandler);

function addBookHandler(e) {
  addModal.clearAllInputs();
  addModal.on();
}
