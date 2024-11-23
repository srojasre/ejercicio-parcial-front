import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'http://localhost:8080/query';

  constructor(private http: HttpClient) { }
  /*
  * Hace un post en el query del servidor donde ejecuta el prompt y el format
  * Devuelve la respuesta del servidor
  *  */
  getPokemon(prompt: string) {
    const body = {
      prompt: prompt,
      format: 'The format response has three keys(title, description, category) where title is the name of the pokemon, description is the description of the pokemon and category is the category of the pokemon.'
    };
    return this.http.post<any>(this.apiUrl, body);


  }
}

//@author Sebastián Rojas