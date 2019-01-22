import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../rest.service';
import { Cookbook } from '../../models/Cookbook';
import {Router, ActivatedRoute} from '@angular/router';
import {environment} from '../../../src/environments/environment';

@Component({
  selector: 'app-cookbooks-list',
  templateUrl: './cookbooks-list.component.html',
  styleUrls: ['./cookbooks-list.component.scss']
})
export class CookbooksListComponent implements OnInit {
  cookbooksList: Array<Cookbook> = [];


  constructor(private rest: RestService, http: HttpClient, private router: Router,) {

  }

  ngOnInit() {
    this.fetchCookbooks();
  }

  hasCookbooks() {
    return this.cookbooksList.length > 0;
  }

  private fetchCookbooks(): void {
    this.rest.apiGet<any[]>("session/recipe/cookbooksForUser").subscribe(
      resp => {
        //console.log("this is the returning cookbook: ");
        //console.log(resp);
        this.cookbooksList = resp.map(function (cookbookObject) {
          return new Cookbook(cookbookObject);
        }
        )
        console.log("converted Cookbooks"); 
        console.log(this.cookbooksList); 
      }  
    )
  }

  cookbookLink(cookbook: Cookbook): string{
    console.log("what is my cookbook");
    console.log(cookbook.id);
    return "/view-cookbook/" + cookbook.id;
  }

  async createNewCookbook(){
    console.log("Create new Cookbook");
    let responseObject:any = await this.rest.apiPost<any>("session/recipe/createCookbook",null).toPromise();
    console.log("response object is: " );
    console.log(responseObject);
    this.router.navigateByUrl(this.cookbookLink(new Cookbook(responseObject)));
  }

}
