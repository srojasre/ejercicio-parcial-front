import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor(pokemonService) {
        this.pokemonService = pokemonService;
        this.title = 'Pokemon Card Generator';
        this.prompt = '';
        this.pokemonList = [];
        this.mostCommonCategory = '';
    }
    onSubmit() {
        this.pokemonService.getPokemon(this.prompt).subscribe(response => {
            const newPokemon = {
                title: this.extractTitle(response.response),
                description: this.extractDescription(response.response),
                category: this.extractCategory(response.response)
            };
            this.pokemonList.push(newPokemon);
            this.updateMostCommonCategory();
        });
    }
    extractTitle(response) {
        const titleMatch = response.match(/Title:\s*(.*)/);
        return titleMatch ? titleMatch[1].trim() : '';
    }
    extractDescription(response) {
        const descriptionMatch = response.match(/Description:\s*(.*)/);
        return descriptionMatch ? descriptionMatch[1].trim() : '';
    }
    extractCategory(response) {
        const categoryMatch = response.match(/Category:\s*(.*)/);
        return categoryMatch ? categoryMatch[1].trim() : '';
    }
    updateMostCommonCategory() {
        const categoryCount = {};
        this.pokemonList.forEach(pokemon => {
            categoryCount[pokemon.category] = (categoryCount[pokemon.category] || 0) + 1;
        });
        this.mostCommonCategory = Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b);
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map