import icons from 'url:../../img/icons.svg';
import view from './view.js';

class AddRecipeView extends view {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-model');
  _message = 'Recipe was successfuly uploaded';

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('clock', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpdate(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataarr = [...new FormData(this)];
      const data = Object.fromEntries(dataarr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
