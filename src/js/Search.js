import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults(){
        const proxy = 'https://crossorigin.me/';
        const key = '6fef1ceee29fc932e1ee88651708a4ed';
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result); 
        } catch(error) {
            alert(error);
        }

    }
}



























