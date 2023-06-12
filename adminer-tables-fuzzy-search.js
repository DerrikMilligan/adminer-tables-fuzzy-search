
class TableFuzzyFinder {
  tableElements = [];

  constructor() {
    this.searchResults = [];
    this.searchInput = '';
    this.selectedResult = null;
    this.tableElements = Array.from(document.querySelectorAll('ul#tables li'));

    this.tableInfo = this.tableElements.map((element) => {
      return {
        element: element,
        name: element.querySelector('.structure, .view').textContent,
      }
    });

    this.fuse = new Fuse(this.tableInfo, { keys: ['name'] });

    this.inputElement = document.querySelector('#fuzzy_tables_search_input');
    this.inputElement.addEventListener('keydown', debounceKeyUp(this.triggerUpdate.bind(this), 300, [ 13, 27, 38, 40 ]));

    // If there's already some search data then run the search
    if (this.inputElement.value.trim().length > 0) {
      this.triggerUpdate();
    }
  }

  triggerUpdate(event) {
    // If we got a key event and it was a special key prevent the keydown event
    if (event && this.handleKeyFunctionality(event)) {
      event.preventDefault();
      return;
    }

    let searchInput = this.inputElement.value.trim();

    // If the new input text is the exact same bounce
    if (searchInput === this.searchInput) {
      return;
    }

    this.searchInput = searchInput;

    // If the search is empty, reset the tables
    if (this.searchInput.length <= 0) {
      this.resetTables();
      return;
    }

    this.searchTables();
  }

  handleKeyFunctionality(event) {
    if (event.keyCode === 40) { // Down
      this.moveSelectionDown();
      return true;

    } else if (event.keyCode === 38) { // Up
      this.moveSelectionUp();
      return true;

    } else if (event.keyCode === 13) { // Enter
      let url = this.selectedResult.querySelector('a.select');
      this.openLink(url, event.shiftKey);
      return true;

    } else if (event.keyCode === 27) { // ESC
      this.inputElement.value = '';
      this.resetTables();
      return true;
    }

    return false;
  }

  moveSelectionUp() {
    let newElement = this.selectedResult.previousElementSibling;
    let alreadyFirstElement = (newElement === null);
    if (alreadyFirstElement)
      return true;

    this.selectedResult.classList.remove('selected-table-entry');
    newElement.classList.add('selected-table-entry');

    this.selectedResult = newElement;
  }

  moveSelectionDown() {
    let newElement = this.selectedResult.nextElementSibling;
    let alreadyLastElement = (newElement === null);
    if (alreadyLastElement)
      return true;

    this.selectedResult.classList.remove('selected-table-entry');
    newElement.classList.add('selected-table-entry');

    this.selectedResult = newElement;
  }

  openLink(url, newTab) {
    if (newTab === true) {
      window.open(url, '_blank').focus();
    } else {
      window.location = url;
    }
  }

  resetTables() {
    this.tableInfo.forEach((info) => {
      const element = info.element;
      element.classList.remove('hide')
      element.parentNode.appendChild(element);
    });
  }

  searchTables() {
    this.searchResults = this.fuse.search(this.searchInput);

    this.tableInfo.forEach((info) => info.element.classList.add('hide'));
    this.searchResults.forEach((search) => {
      const element = search.item.element;
      element.classList.remove('hide');
      element.classList.remove('selected-table-entry');
      element.parentNode.appendChild(element);
    });

    if (this.searchResults.length > 0) {
      this.selectedResult = this.searchResults[0].item.element;
      this.selectedResult.classList.add('selected-table-entry');
    }
  }
}

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// A debouncer method that we can use for keyup specifically and skip the wait for selected key codes
// This may be a bit wonky but I want to skip the debounce if we hit the arrow navigation keys
const debounceKeyUp = (callback, wait, keyCodeExceptions) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    if (Array.isArray(keyCodeExceptions) && keyCodeExceptions.includes(args[0].keyCode)) {
      callback.apply(null, args);
    } else {
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    }
  };
}

ready(() => new TableFuzzyFinder());

