import { Component } from '@angular/core';
import { PokemonService } from './services/pokemon.service';

interface Pokemon {
  title: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Pokemon Card Generator';
  prompt = '';
  pokemonList: Pokemon[] = [];
  mostCommonCategory = '';
  selectedPokemon?: Pokemon;
  
  constructor(private pokemonService: PokemonService) {}

  onSubmit() {
    this.pokemonService.getPokemon(this.prompt).subscribe(response => {
      const newPokemon: Pokemon = {
        title: this.extractTitle(response.response),
        description: this.extractDescription(response.response),
        category: this.extractCategory(response.response)
      };
      this.pokemonList.push(newPokemon);
      this.updateMostCommonCategory();
    });
  }

  extractTitle(response: string): string {
    const titleMatch = response.match(/Title:\s*(.*)/);
    return titleMatch ? titleMatch[1].trim() : '';
  }

  extractDescription(response: string): string {
    const descriptionMatch = response.match(/Description:\s*(.*)/);
    return descriptionMatch ? descriptionMatch[1].trim() : '';
  }

  extractCategory(response: string): string {
    const categoryMatch = response.match(/Category:\s*(.*)/);
    return categoryMatch ? categoryMatch[1].trim() : '';
  }

  updateMostCommonCategory() {
    const categoryCount: { [key: string]: number } = {};
    this.pokemonList.forEach(pokemon => {
      categoryCount[pokemon.category] = (categoryCount[pokemon.category] || 0) + 1;
    });
    this.mostCommonCategory = Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b);
  }
}