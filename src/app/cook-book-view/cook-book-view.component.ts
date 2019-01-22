import { Component, OnInit } from '@angular/core';
import { IRecipe } from '../../models/IRecipe';
import { RestService } from '../rest.service';
import { Cookbook } from '../../models/Cookbook';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cook-book-view',
  templateUrl: './cook-book-view.component.html',
  styleUrls: ['./cook-book-view.component.scss']
})
export class CookBookViewComponent implements OnInit {
  private currentCookbook: Cookbook;

  constructor(private restService: RestService, private activatedRouter: ActivatedRoute) { }

  async ngOnInit() {
    const id = +this.activatedRouter.snapshot.paramMap.get('id');
    console.log("id is");
    console.log(id);
    console.log("await for cookbook");
    
    await this.restService.apiGet<any>('api/cookbooks/' + id).toPromise()
      .then(responsObj => this.currentCookbook = new Cookbook(responsObj));
  }

  recipes(): IRecipe[]{
    let recipes =  this.currentCookbook.recipesDto;
    return recipes;
  }

  hasRecipes(): boolean{
    return this.recipes().length > 0;
  }

}
