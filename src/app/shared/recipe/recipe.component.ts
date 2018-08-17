import {Component, Input, OnInit} from '@angular/core';
import { IRecipe } from '../../../models/IRecipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  @Input() name: string;

  @Input() description: string;

  @Input() imgLink: string;

  @Input() recipe: IRecipe;

  constructor() {
  }

  ngOnInit() {
  }

}
