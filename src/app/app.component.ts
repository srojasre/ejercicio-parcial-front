import { Component } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PokemonDetailComponent} from "./pokemon-detail/pokemon-detail.component";


interface Pokemon {
  title: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    PokemonDetailComponent,

  ],

  standalone: true
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
        title: this.extractFieldFromResponse(response, 'title'),
        description: this.extractFieldFromResponse(response, 'description'),
        category: this.extractFieldFromResponse(response, 'category'),
      };
      this.pokemonList.push(newPokemon);
      this.updateMostCommonCategory();
      console.log(response);
    });
  }

  /*
  * Actualiza las categorias más comunes
  * Si no existen pokemones la categorias es vacia
  * Si Solo existe un pokemon esa sera la categoria más comun
  * Si dos categorias tienen la misma cantidad primara la que estaba antes
  * */

  updateMostCommonCategory() {
    const categoryCount: { [key: string]: number } = {};
    this.pokemonList.forEach(pokemon => {
      categoryCount[pokemon.category] = (categoryCount[pokemon.category] || 0) + 1;
    });
    this.mostCommonCategory = Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b);
  }

  /*
  * Extrae el response del back para evitar problemas busca diferentes formatos
  * */
  extractFieldFromResponse(response: any, field: string): string {
    try {
      // Extraer la cadena JSON de la propiedad `response`
      const jsonString = typeof response.response === 'string' ? response.response : '';
      // Parsear la cadena JSON
      const parsedResponse = JSON.parse(jsonString);
      // Devolver el campo solicitado
      return parsedResponse[field] || '';
    } catch (error) {
      console.error('Error parsing response:', error);
      return '';
    }
  }


}