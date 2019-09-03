'use strict';
function Book(
  title = 'Unknown',
  author = 'Unknown',
  totalPages = 0,
  completedPages = 0,
  completed = false
) {
  this.id = ++uniqueId;
  this.title = title;
  this.author = author;
  this.totalPages = totalPages;
  this.completedPages = completedPages;
  this.completed = completed;
  this.container = null;
}

function BookContainer(book) {
  this.element = document.createElement('div');
  this.element.classList.add('book-container');

  this.element.dataset.id = book.id;

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

  // add container to book
  book.container = this;

  this.bookRemove = function() {
    // remove book and container
    let index = myLibrary.findIndex((b) => b.id === book.id);
    myLibrary.splice(index, 1);

    libraryContainer.removeChild(this.element);
    saveAll();
  };
  // handlers
  // call confirmation modal
  const queryConfirmationHandler = (e) => {
    confirmationSelectionModal.confirm(this);
  };

  const bookEditHandler = (e) => {
    editModal.clearAllInputs();
    editModal.on();
    editModal.editBook(book.id);
  };

  const bookIncCompletedPagesHandler = (e) => {
    if (book.completedPages < book.totalPages) {
      book.completedPages++;
      if (book.completedPages === book.totalPages) {
        book.completed = true;
      }
      this.updateContainerFor(book);
      saveAll();
    }
  };
  const bookDecCompletedPagesHandler = (e) => {
    if (book.completedPages > 0) {
      book.completedPages--;
      book.completed = false;
      this.updateContainerFor(book);
      saveAll();
    }
  };
  const bookCompleteHandler = (e) => {
    book.completed = true;
    book.completedPages = book.totalPages;
    this.updateContainerFor(book);
    saveAll();
  };

  // add events
  this.buttonPagesComplete.addEventListener('click', bookCompleteHandler);
  this.buttonPagesSubtract.addEventListener(
    'click',
    bookDecCompletedPagesHandler
  );
  this.buttonPagesAdd.addEventListener('click', bookIncCompletedPagesHandler);
  this.buttonRemove.addEventListener('click', queryConfirmationHandler);
  this.buttonEdit.addEventListener('click', bookEditHandler);
}

BookContainer.prototype.updateContainerFor = function(book) {
  if (book.container) {
    book.container.title.textContent = book.title;
    book.container.author.textContent = book.author;
    book.container.totalPages.textContent = book.totalPages;
    book.container.completedPages.textContent = book.completedPages;
    // book.container something = book.completed;
  }
};

function ModalBookFactory(modalType) {
  if (modalType === 'add' || modalType === 'edit') {
    // create wrapper element
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add(`modal-${modalType}-wrapper`);
    this.wrapper.classList.add('display-none');

    // create modal-add element
    this.element = document.createElement('div');
    this.element.classList.add(`modal-${modalType}`);

    // create modal-title element
    this.modalTitle = document.createElement('div');
    this.modalTitle.classList.add('modal-title');
    // create title h2 element
    this.title = document.createElement('h2');
    if (modalType === 'add') {
      this.title.textContent = 'Add New Book';
    } else {
      this.title.textContent = 'Edit Book';
    }
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
    this.bookTitleInput.setAttribute('id', `book-${modalType}-title`);
    this.bookTitleInput.setAttribute('required', '');
    this.bookTitleInput.validated = false;
    // add input
    this.bookTitleElement.appendChild(this.bookTitleInput);
    // create label
    this.bookTitleLabel = document.createElement('label');
    this.bookTitleLabel.classList.add('title');
    this.bookTitleLabel.setAttribute('for', `book-${modalType}-title`);
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
    this.bookAuthorInput.setAttribute('id', `book-${modalType}-author`);
    this.bookAuthorInput.setAttribute('required', '');
    this.bookAuthorInput.validated = false;
    // add input
    this.bookAuthorElement.appendChild(this.bookAuthorInput);
    // create label
    this.bookAuthorLabel = document.createElement('label');
    this.bookAuthorLabel.classList.add('title');
    this.bookAuthorLabel.setAttribute('for', `book-${modalType}-author`);
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
    this.bookTotalPagesInput.setAttribute(
      'id',
      `book-${modalType}-total-pages`
    );
    this.bookTotalPagesInput.setAttribute('required', '');
    this.bookTotalPagesInput.validated = false;
    // add input
    this.bookTotalPagesElement.appendChild(this.bookTotalPagesInput);
    // create label
    this.bookTotalPagesLabel = document.createElement('label');
    this.bookTotalPagesLabel.classList.add('title');
    this.bookTotalPagesLabel.setAttribute(
      'for',
      `book-${modalType}-total-pages`
    );
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
    this.bookCompletedPagesInput.setAttribute(
      'id',
      `book-${modalType}-completed-pages`
    );
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
      `book-${modalType}-completed-pages`
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
    if (modalType === 'add') {
      this.buttonAdd = document.createElement('button');
      this.buttonAdd.classList.add('button');
      this.buttonAdd.classList.add('green-bg');
      this.buttonAdd.textContent = 'Add';

      // add  button
      this.options.appendChild(this.buttonAdd);
    } else {
      // create edit button
      this.buttonEdit = document.createElement('button');
      this.buttonEdit.classList.add('button');
      this.buttonEdit.classList.add('green-bg');
      this.buttonEdit.textContent = 'Edit';

      // add  button
      this.options.appendChild(this.buttonEdit);
    }

    // add options element
    this.element.appendChild(this.options);

    // add element
    this.wrapper.appendChild(this.element);

    // events and functions

    // disable modal
    this.buttonCancel.addEventListener('click', () => this.off());

    // add new book
    if (modalType == 'add') {
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
          // add new book to myLibrary
          myLibrary.push(newBook);
          libraryContainer.insertBefore(
            newBookWrapper.element,
            libraryContainer.lastElementChild
          );
          saveAll();
          this.clearAllInputs();
          this.off();
        }
      });
    } else {
      // make new changes to book
      this.buttonEdit.addEventListener('click', () => {
        if (this.validate()) {
          let book = myLibrary.find((book) => book.id == this.currentBookId);
          book.title = this.bookTitleInput.value;
          book.author = this.bookAuthorInput.value;
          book.totalPages = +this.bookTotalPagesInput.value;
          book.completedPages = +this.bookCompletedPagesInput.value;
          book.completed = this.bookCompleted.checked;
          this.off();
          book.container.updateContainerFor(book);
          saveAll();
        }
      });
    }

    // edit book
    if (modalType === 'edit') {
      this.editBook = function(bookId) {
        // change current id
        this.currentBookId = bookId;
        let book = myLibrary.find((book) => book.id == bookId);
        this.bookTitleInput.value = book.title;
        this.bookAuthorInput.value = book.author;
        this.bookTotalPagesInput.value = book.totalPages;
        this.bookCompletedPagesInput.value = book.completedPages;
        this.bookCompleted.checked = book.completed;
        this.changeAllToValid();

        if (book.totalPages !== book.completedPages) {
          this.bookCompleted.checked = false;
        }
      };
    }

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
    // handler for completed pages validation
    const validCompletedPagesHandler = (e) => {
      if (
        this.bookTotalPagesInput.validated &&
        !!this.bookCompletedPagesInput.value &&
        /^\d+$/g.test(this.bookCompletedPagesInput.value) &&
        +this.bookCompletedPagesInput.value >= 0 &&
        +this.bookCompletedPagesInput.value <= +this.bookTotalPagesInput.value
      ) {
        this.changeToValid(
          this.bookCompletedPagesInput,
          this.bookCompletedPagesLabel,
          'Completed pages'
        );
        if (
          +this.bookTotalPagesInput.value ===
          +this.bookCompletedPagesInput.value
        ) {
          this.bookCompleted.checked = true;
        } else {
          this.bookCompleted.checked = false;
        }
      } else {
        this.changeToNotValid(
          this.bookCompletedPagesInput,
          this.bookCompletedPagesLabel,
          'Completed pages number should be less than total pages number'
        );
        this.bookCompleted.checked = false;
      }
    };
    // handler for checkbox completed pages
    const validCompletedCheckBoxHandler = (e) => {
      if (this.bookTotalPagesInput.validated && this.bookCompleted.checked) {
        this.bookCompletedPagesInput.value = this.bookTotalPagesInput.value;
        validCompletedPagesHandler();
      }
      if (
        +this.bookTotalPagesInput.value === +this.bookCompletedPagesInput.value
      ) {
        this.bookCompleted.checked = true;
      }
      if (!this.bookTotalPagesInput.validated) {
        this.bookCompleted.checked = false;
      }
    };
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
        validCompletedPagesHandler();
      } else {
        this.changeToNotValid(
          this.bookTotalPagesInput,
          this.bookTotalPagesLabel,
          'Total pages number should be more than 0 and less than 9999999'
        );
      }
    });
    // validation completed pages
    this.bookCompletedPagesInput.addEventListener(
      'input',
      validCompletedPagesHandler
    );
    // validation completed check
    this.bookCompleted.addEventListener('click', validCompletedCheckBoxHandler);
  } // this is end of if btw
}

// create prototype functions for modals
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
  if (this.wrapper) {
    this.clearInput(this.bookTitleInput, this.bookTitleLabel, 'Title');
    this.clearInput(this.bookAuthorInput, this.bookAuthorLabel, 'Author');
    this.clearInput(
      this.bookTotalPagesInput,
      this.bookTotalPagesLabel,
      'Total pages'
    );
    this.clearInput(
      this.bookCompletedPagesInput,
      this.bookCompletedPagesLabel,
      'Completed pages'
    );
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
  if (this.wrapper) {
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
    if (!this.bookCompletedPagesInput.validated) {
      this.changeToNotValid(
        this.bookCompletedPagesInput,
        this.bookCompletedPagesLabel,
        'Completed pages number should be less than total pages number'
      );
    }

    if (
      this.bookTitleInput.validated &&
      this.bookAuthorInput.validated &&
      this.bookTotalPagesInput.validated &&
      this.bookCompletedPagesInput.validated
    ) {
      return true;
    }
  }
};
ModalBookFactory.prototype.changeAllToValid = function() {
  this.changeToValid(this.bookTitleInput, this.bookTitleLabel, 'Title');
  this.changeToValid(this.bookAuthorInput, this.bookAuthorLabel, 'Author');
  this.changeToValid(
    this.bookCompletedPagesInput,
    this.bookCompletedPagesLabel,
    'Completed pages'
  );
  this.changeToValid(
    this.bookTotalPagesInput,
    this.bookTotalPagesLabel,
    'Total pages'
  );
};

// modal query factory
function ModalQueryFactory(modalType) {
  if (
    modalType === 'storage-selection' ||
    modalType === 'confirmation-selection'
  ) {
    // create wrapper element
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add(`modal-${modalType}-wrapper`);
    this.wrapper.classList.add('display-none');

    // create element
    this.element = document.createElement('div');
    this.element.classList.add(`modal-${modalType}`);

    // create title element
    this.modalTitle = document.createElement('div');
    this.modalTitle.classList.add('modal-title');

    // create title h2 element
    this.title = document.createElement('h2');

    if (modalType === 'storage-selection') {
      this.title.textContent = 'Where to Save Your Data?';
    } else {
      this.title.textContent = 'Do you Want to Remove Data?';
    }
    // add title element
    this.modalTitle.appendChild(this.title);
    // add modal-title element
    this.element.appendChild(this.modalTitle);

    // create content element
    this.content = document.createElement('div');
    this.content.classList.add('content');
    // create element for content

    if (modalType === 'storage-selection') {
      // create storage cloud element
      this.storageCloudElement = document.createElement('div');
      this.storageCloudElement.classList.add('element');
      // create storage cloud wrapper
      this.storageCloudWrapper = document.createElement('div');
      this.storageCloudWrapper.classList.add('selection');
      this.storageCloudWrapper.classList.add('cloud');
      // create button cloud
      this.storageCloudButton = document.createElement('button');
      this.storageCloudButton.textContent = 'Cloud';

      // add button cloud element
      this.storageCloudWrapper.appendChild(this.storageCloudButton);
      // add wrapper element
      this.storageCloudElement.appendChild(this.storageCloudWrapper);

      // create storage local element
      this.storageLocalElement = document.createElement('div');
      this.storageLocalElement.classList.add('element');
      // create storage local wrapper
      this.storageLocalWrapper = document.createElement('div');
      this.storageLocalWrapper.classList.add('selection');
      this.storageLocalWrapper.classList.add('local');
      // create button local
      this.storageLocalButton = document.createElement('button');
      this.storageLocalButton.textContent = 'Local';

      // add button local element
      this.storageLocalWrapper.appendChild(this.storageLocalButton);
      // add wrapper element
      this.storageLocalElement.appendChild(this.storageLocalWrapper);

      this.content.appendChild(this.storageCloudElement);
      this.content.appendChild(this.storageLocalElement);
    } else {
      // create no selection element
      this.noSelectionElement = document.createElement('div');
      this.noSelectionElement.classList.add('element');
      // create no wrapper
      this.noSelectionWrapper = document.createElement('div');
      this.noSelectionWrapper.classList.add('selection');
      // create button no
      this.noSelectionButton = document.createElement('button');
      this.noSelectionButton.textContent = 'No';

      // add button no element
      this.noSelectionWrapper.appendChild(this.noSelectionButton);
      // add wrapper element
      this.noSelectionElement.appendChild(this.noSelectionWrapper);

      // create yes selection element
      this.yesSelectionElement = document.createElement('div');
      this.yesSelectionElement.classList.add('element');
      // create yes wrapper
      this.yesSelectionWrapper = document.createElement('div');
      this.yesSelectionWrapper.classList.add('selection');
      // create button yes
      this.yesSelectionButton = document.createElement('button');
      this.yesSelectionButton.textContent = 'Yes';

      // add button yes element
      this.yesSelectionWrapper.appendChild(this.yesSelectionButton);
      // add wrapper element
      this.yesSelectionElement.appendChild(this.yesSelectionWrapper);

      this.content.appendChild(this.noSelectionElement);
      this.content.appendChild(this.yesSelectionElement);
    }

    // add content element
    this.element.appendChild(this.content);
    // add element
    this.wrapper.appendChild(this.element);

    // events
    if (modalType === 'confirmation-selection') {
      // handlers for confirmation
      const yesButtonHandler = () => {
        if (this.bookContainerToRemove) {
          this.bookContainerToRemove.bookRemove();
          this.bookContainerToRemove = null;
        }
        this.off();
      };
      const noButtonHandler = () => {
        this.bookContainerToRemove = null;
        this.off();
      };

      this.yesSelectionButton.addEventListener('click', yesButtonHandler);
      this.noSelectionButton.addEventListener('click', noButtonHandler);
      // waiting for confirmation
      this.confirm = (bookContainer) => {
        this.bookContainerToRemove = bookContainer;
        this.on();
      };
    }
  }
}

ModalQueryFactory.prototype.on = ModalBookFactory.prototype.on;
ModalQueryFactory.prototype.off = ModalBookFactory.prototype.off;
ModalQueryFactory.prototype.insertInBody =
  ModalBookFactory.prototype.insertInBody;

// ref main elements
const libraryContainer = document.querySelector('.library-main');
const buttonAddBook = document.querySelector('.add-button');
let addModal = new ModalBookFactory('add');
let editModal = new ModalBookFactory('edit');
let storageSelectionModal = new ModalQueryFactory('storage-selection');
let confirmationSelectionModal = new ModalQueryFactory(
  'confirmation-selection'
);

// append to the end of body
addModal.insertInBody();
editModal.insertInBody();
storageSelectionModal.insertInBody();
confirmationSelectionModal.insertInBody();

// make remember this selection
// storageSelectionModal.on();
// my library data
let myLibrary = [];
let uniqueId = null;

// local storage data
let isLocal = true;
// load data from cloud or local
loadAll();
// add events
buttonAddBook.addEventListener('click', addBookHandler);

function addBookHandler(e) {
  addModal.clearAllInputs();
  addModal.on();
}

// storageLocal functions
function loadDataFromLocalStorage(key, obj = null) {
  if (localStorage && localStorage[key]) {
    obj = JSON.parse(localStorage[key]);
    return obj;
  }
}
function saveDataToLocalStorage(key, obj) {
  if (localStorage) {
    localStorage[key] = JSON.stringify(obj);
  }
}

function getUniqueIdFromLocalStorage() {
  const id = loadDataFromLocalStorage('uniqueId');
  if (!id || !myLibrary) {
    return 0;
  } else {
    return +id;
  }
}
function getLibraryFromLocalStorage() {
  let lib = loadDataFromLocalStorage('library');
  if (!lib) {
    return [];
  } else {
    return lib;
  }
}

function saveAll() {
  if (isLocal) {
    saveDataToLocalStorage('library', myLibrary);
    saveDataToLocalStorage('uniqueId', uniqueId);
  }
}
function loadAll() {
  if (isLocal) {
    myLibrary = getLibraryFromLocalStorage();
    uniqueId = getUniqueIdFromLocalStorage();
  }
}

// function renderLibrary() {
//   myLibrary.forEach((b)=>{
//     addModal.
//   });
// }
