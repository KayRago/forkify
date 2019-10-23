// Global app controller

//https://www.food2fork.com/api/search
//6fef1ceee29fc932e1ee88651708a4ed

import Search from './Search';
import Recipe from './Recipe';
import * as searchView from './searchView';
import { elements, renderLoader, clearLoader } from './base';

// global state of the app:
//search object
//current recipe object
// shopping list object
// liked recipes
const state = {};

// search controller
const controlSearch = async () => {
    // 1. get query from view
    const query = searchView.getInput();
    
    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);
        
        // 3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        
        try {
            // 4. search for recipes
            await state.search.getResults();
        
            // 5. render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something went wrong with the search');
            clearLoader();
        }

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
    
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


// recipe controller 
const controlRecipe = async () => {
    // get id from url
    const id = window.location.hash.replace('#', '');
    console.log(id);
    
    if (id) {
        // prepare UI for changes
        
        // create new recipe object
        state.recipe = new Recipe(id);
        
        
        try {
            // get recipe data
            await state.recipe.getRecipe();
            //state.recipe.parseIngredients();
        
            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
        
            // render recipe
            console.log(state.recipe);
        } catch (err) {
            alert('Error processing recipe');
        }
        
        
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));





























