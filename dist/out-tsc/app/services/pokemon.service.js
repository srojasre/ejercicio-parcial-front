import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let PokemonService = class PokemonService {
    constructor(http) {
        this.http = http;
        this.apiUrl = 'http://localhost:8080/query';
    }
    getPokemon(prompt) {
        const body = {
            prompt: prompt,
            format: 'The format response has three keys(title, description, category) where title is the name of the pokemon, description is the description of the pokemon and category is the category of the pokemon.'
        };
        return this.http.post(this.apiUrl, body);
    }
};
PokemonService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PokemonService);
export { PokemonService };
//# sourceMappingURL=pokemon.service.js.map