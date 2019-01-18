import { Component, OnInit } from '@angular/core';
import { IRecipe } from '../../models/IRecipe';
import { RestService } from '../rest.service';
import { Cookbook } from '../../models/Cookbook';

@Component({
  selector: 'app-cook-book-view',
  templateUrl: './cook-book-view.component.html',
  styleUrls: ['./cook-book-view.component.scss']
})
export class CookBookViewComponent implements OnInit {
  private currentCookbook: Cookbook;

  constructor(private restService: RestService) { }

  ngOnInit() {
  }

  recipes(): IRecipe[]{
    let recipes =  this.currentCookbook.recipes;
    return recipes;
  }

  hasRecipes(): boolean{
    return this.recipes().length > 0;
  }

}
