import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import * as model from './module.js';
import resultsview from './view/resultView.js';
import bookmarkview from './view/bookmarkView.js';
import addRecipeView from './view/addRecipeView.js';
import paginationVi from './view/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import bookmarkView from './view/bookmarkView.js';
import { MODAL_CLOSE_SEC } from './config.js/';
// if (module.hot) {
//   module.hot.accept();
// }
// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(window.location.hash);
    ///console.log(window);
    if (!id) return;
    //console.log(id);
    recipeView.renderSpinner();
    resultsview.update(model.makePage());
    bookmarkView.update(model.state.bookMarks);
    await model.loadRecipe(id);

    // const recipeView = new recipeView(model.state.recipe)
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResult = async function () {
  try {
    resultsview.renderSpinner();
    const query = searchView.getQuery();
    await model.loadSearchResult(query);

    resultsview.render(model.makePage());
    paginationVi.render(model.state.search);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const controlPagination = function (goToPage) {
  resultsview.render(model.makePage(goToPage));
  paginationVi.render(model.state.search);
};
const controlServing = function (newServing) {
  model.updateServing(newServing);
  recipeView.update(model.state.recipe);
};

const controlAddBokmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarkview.render(model.state.bookMarks);
};

const controlBookmark = function () {
  bookmarkView.render(model.state.bookMarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
    addRecipeView.renderSpinner();
    addRecipeView.renderMessage();

    recipeView.render(model.state.recipe);
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC);
    bookmarkView.render(model.state.bookMarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  console.log('dfkdjik');
  bookmarkView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerbookMark(controlAddBokmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationVi.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpdate(controlAddRecipe);
};
init();

//window.addEventListener('hashchange', controlRecipes);

// const hay = [
//   { h: 'a', j: 'b' },
//   { h: 'e', j: 'f' },
//   { h: 'q', j: 'w' },
// ];
// console.log(

//   hay
//     .map(ing => {
//       return `${ing.h}-----${ing.j}`;
//     })
//     .join(' ')
// );
