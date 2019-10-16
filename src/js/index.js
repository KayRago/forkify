// Global app controller

//https://www.food2fork.com/api/search
//6fef1ceee29fc932e1ee88651708a4ed

import Search from './Search';
import * as searchView from './searchView';
import { elements, renderLoader, clearLoader } from './base';

// global state of the app:
//search object
//current recipe object
// shopping list object
// liked recipes
const state = {};

const controlSearch = async () => {
    // 1. get query from view
    const query = searchView.getInput();
    console.log(query);
    
    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);
        
        // 3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        
        // 4. search for recipes
        await state.search.getResults();
        
        // 5. render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}

    elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
    
});






























