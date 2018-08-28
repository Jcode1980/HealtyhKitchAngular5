import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';
import {ICategory} from '../../models/ICategory';
import {IRecipe} from '../../models/IRecipe';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RestService} from '../rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dietaryRequirements;

  healthBenefits;

  cuisines;

  searchString;

  buildMealFirstItem = '';
  buildMealSecondItem = '';
  buildMealThirdItem = '';

  allMealTypes;

  advancedSearchExpanded = false;

  dietaryRequirementsToSearch = [];
  benefitsToSerach = [];
  cuisinesToSearch = [];
  categoriesToSearch = [];

  recipes: IRecipe [] = [];

  trendings: IRecipe [];

  showResultsBlock = false;

  private baseUrl = `${environment.apiUrl}api/recipes`;
  public resourceURL = environment.baseURL;

  constructor(private homeService: HomeService, private http: HttpClient, private rest: RestService) {
  }

  async ngOnInit() {
    this.trendings = await this.homeService.getTrandingRecipes();
    // console.log('this.trendings', this.trendings);
    this.loadMealTypes();
    this.loadDietaryCategories();
    this.loadHealthBenefits();
    this.loadCuisines();
  }

  openAdvancedSearch() {
    this.advancedSearchExpanded = !this.advancedSearchExpanded;
  }

  closeAdvancedSearch() {
    this.advancedSearchExpanded = false;
    // this.categoriesToSearch = [];
    // this.cuisinesToSearch = [];
    // this.benefitsToSerach = [];
    // this.dietaryRequirementsToSearch = [];

    // this.loadMealTypes();
    // this.loadDietaryCategories();
    // this.loadHealthBenefits();
    // this.loadCuisines();

  }

  chooseDietary(item, checked) {
    if (checked.srcElement.checked) {
      this.dietaryRequirementsToSearch.push(item.id);
      item.checked = true;
    } else {
      this.dietaryRequirementsToSearch = this.dietaryRequirementsToSearch.filter(e => e !== item.id);
      item.checked = false;
    }
  }

  chooseBenefits(item, checked) {
    if (checked.srcElement.checked) {
      this.benefitsToSerach.push(item.id);
      item.checked = true;
    } else {
      this.benefitsToSerach = this.benefitsToSerach.filter(e => e !== item.id);
      item.checked = false;
    }
  }

  chooseCuisines(item, checked) {
    if (checked.srcElement.checked) {
      this.cuisinesToSearch.push(item.id);
      item.checked = true;
    } else {
      this.cuisinesToSearch = this.cuisinesToSearch.filter(e => e !== item.id);
      item.checked = false;
    }
  }

  chooseCategories(item, checked) {
    if (checked.srcElement.checked) {
      this.categoriesToSearch.push(item.id);
      item.checked = true;
    } else {
      this.categoriesToSearch = this.categoriesToSearch.filter(e => e !== item.id);
      item.checked = false;
    }
  }

  async submitSearch() {
    this.advancedSearchExpanded = false;
    const strings = [];
    strings.push(this.searchString);
    this.recipes = await this.homeService.getRecipesWithFilters(
      strings,
      this.categoriesToSearch,
      this.cuisinesToSearch,
      this.benefitsToSerach,
      this.dietaryRequirementsToSearch
    );
    this.showResultsBlock = true;
  }

  async searchInTrending() {
    this.recipes = await this.homeService.getTrandingRecipes();
    this.showResultsBlock = true;
  }

  backToHomePage() {
    this.recipes = [];
    this.searchString = '';
    this.buildMealFirstItem = '';
    this.buildMealSecondItem = '';
    this.buildMealThirdItem = '';
    this.showResultsBlock = false;
  }

  async buildMealSearch() {
    this.searchString = '';
    this.recipes = await this.homeService.getRecipesWithFilters(
      [this.buildMealFirstItem, this.buildMealSecondItem, this.buildMealThirdItem],
      [],
      [],
      [],
      []
    );
    this.showResultsBlock = true;
    this.allMealTypes.forEach(e => {
      e.checked = false;
    });
    this.dietaryRequirements.forEach(e => {
      e.checked = false;
    });
    this.healthBenefits.forEach(e => {
      e.checked = false;
    });
    this.cuisines.forEach(e => {
      e.checked = false;
    });
  }

  searchType(item) {
    this.http.get<IRecipe[]>(`${this.baseUrl}/recipes`,
      {
        params: {
          'mealTypesID': item.id,
        }
      }
    ).subscribe(res => {
      this.searchString = '';
      this.buildMealFirstItem = '';
      this.buildMealSecondItem = '';
      this.buildMealThirdItem = '';
      this.recipes = res;
      this.showResultsBlock = true;
      this.allMealTypes.forEach(e => {
        e.checked = e.id === item.id;
      });
    });
  }


  loadMealTypes() {
    this.rest.apiGet('api/recipes/allMealTypes').subscribe((res: any[]) => {
        this.allMealTypes = res.map(e => {
          return {
            ...e,
            checked: false
          };
        });
        console.log('this.allMealTypes', this.allMealTypes);
      }
    );
  }

  loadDietaryCategories() {
    this.rest.apiGet('api/recipes/allDietaryCategories').subscribe((res: any[]) => {
        this.dietaryRequirements = res.map(e => {
          return {
            ...e,
            checked: false
          };
        });
      }
    );
  }

  loadHealthBenefits() {
    this.rest.apiGet('api/recipes/allNutritionalBenefits').subscribe((res: any[]) => {
        this.healthBenefits = res.map(e => {
          return {
            ...e,
            checked: false
          };
        });
      }
    );
  }

  loadCuisines() {
    this.rest.apiGet('api/recipes/allCuisines').subscribe((res: any[]) => {
        this.cuisines = res.map(e => {
          return {
            ...e,
            checked: false
          };
        });
      }
    );
  }


}
