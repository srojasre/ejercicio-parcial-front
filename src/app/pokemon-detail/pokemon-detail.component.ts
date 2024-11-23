import { Component, Input } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  standalone: true,
  imports: [
    NgIf
  ]
})
export class PokemonDetailComponent {
  @Input() pokemon!: { title: string; description: string; category: string };
}