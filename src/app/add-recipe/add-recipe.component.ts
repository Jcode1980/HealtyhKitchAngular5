import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RestService} from '../rest.service';
import {Router, ActivatedRoute} from '@angular/router';
import { IRecipe } from '../../models/IRecipe';
import {IMetric} from '../../models/IMetric';
import { IMeasuredIngredient } from '../../models/IMeasuredIngredient';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddRecipeComponent implements OnInit {
  recipeID;
  defaultImageID;
  recipeTitle = 'Title';
  isRecipeTitleChange = false;
  
  isModalOpen = false;

  method: string;
  cropedFile: File;

  f: any;

  howManyIngredients = 1;
  maxArr = [1];
  //ingredientsList = [null, {}];
  ingredientsList = [];

  imageChangedEvent: any = '';
  croppedImage: any = '';

  cuisineList = [];
  private selectedCuisines = [];

  categoriesList = [];
  selectedCategories = [];

  benifitsList = [];
  selectedBenifits = [];

  requirementsList = [];
  selectedRequirments = [];


  metricsList:Array<IMetric> = [];
  selectedMetric:IMetric;

  selectedMetricToPush = null;
  cusinesListToPost = [];
  categoriesListToPost = [];
  benifitsListToPost = [];
  requirmentListToPost = [];
  ingredientsListToPost = [];

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };

  singleSelectSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 1,
  };


  // constructor(private rest: RestService, private router: Router ) {
  // }

  constructor(private rest: RestService, private activatedRouter: ActivatedRoute, private router: Router ) {
  }

  async ngOnInit() {
    this.loadMealTypes();
    this.loadDietaryCategories();
    this.loadHealthBenefits();
    this.loadCuisines();
    this.loadMetrics();
    
    const id = +this.activatedRouter.snapshot.paramMap.get('id');
    if(id){
      await this.initializeRecipeData();
    }
    else{
       console.log("no recipe id found"); 
    }
  }


  
  async initializeRecipeData() {
    console.log("initializeRecipeData");
    const id = +this.activatedRouter.snapshot.paramMap.get('id');
    let currentRecipe :IRecipe; 
    currentRecipe = await this.rest.apiGet<IRecipe>(`api/recipes/${id}`).toPromise();
    console.log("got recipe");
    console.log(currentRecipe);
    this.recipeTitle = currentRecipe.name;
    this.method = currentRecipe.instructions;
    this.ingredientsList = currentRecipe.measuredIngredients;

  
    console.log("ingredients is:");
     console.log(this.ingredientsList.length);
     if(this.ingredientsList.length === 0){
       console.log("got here ingredients");
       this.ingredientsList = [this.createNewIngredient()];
     }
    
    //this.howManyIngredients = this.ingredientsList.length;
    console.log("this.ingredientsList");
    console.log(this.ingredientsList);  
    console.log("no of ingredients in list: " + this.ingredientsList.length);

    this.defaultImageID=currentRecipe.defaultImageID;

    this.recipeID = currentRecipe.id;
    this.selectedBenifits = currentRecipe.nutritionalBenefits;
    this.selectedRequirments = currentRecipe.dietaryCategories;
    this.selectedCuisines = currentRecipe.cuisines;
    this.selectedCategories = currentRecipe.mealTypes;
    
  }

  createNewIngredient():IMeasuredIngredient{
    let newIngredient:IMeasuredIngredient = {
      id:null,
      amount: 0,
      name: null,
      metric: this.metricsList[0]
    }

    return newIngredient;
  }

 baseItemSelect(item:any, theArray:Array<any>[]){
    console.log("Going to select item");
    console.log(item);
    theArray.push(item);
 }

  onCuisineSelect(item: any) {
    console.log("Going to select cuisine");
    console.log(item);
    //this.cusinesListToPost.push(item);
    this.selectedCuisines.push(item);
  }
  
 
  
  onCuisineDeselect(item: any) {
    console.log("Going to deselect cuisine");
    console.log(item);
    this.selectedCuisines = this.selectedCuisines.filter(obj => obj.id !== item.id);
    console.log("filtered c list is");
    console.log(this.selectedCuisines);
    //const newArr = [];
    //this.cusinesListToPost.forEach(e => {
    // this.cuisineList.forEach(e => {
    //   if (e.id !== item.id) {
    //     newArr.push(e);
    //   }
    // });
    // this.cusinesListToPost = newArr;
  }

  onSelectAllCuisines(items: any) {
    //this.cusinesListToPost = items;
    this.selectedCuisines = items;
  }

  onDeselectAllCuisines() {
    //this.cusinesListToPost = [];
    this.selectedCuisines = [];
  }

  onCategorySelect(item: any) {
    console.log("adding category");
    console.log(item);
    //this.categoriesListToPost.push(item);
    this.selectedCategories.push(item);
  }

  onSelectAllCategories(items: any) {
    //this.categoriesListToPost = items;
    this.selectedCategories= items;
  }

  onCategoryDeselect(item: any) {
    this.selectedCategories = this.selectedCategories.filter(obj => obj.id !== item.id);
  }

  onDeselectAllCategories(item: any) {
    this.selectedCategories = [];
  }

  onBenefitSelect(item: any) {
    this.benifitsListToPost.push(item);
  }

  onSelectAllBenifits(item: any) {
    this.benifitsListToPost = item;
  }

  onBenefitDeselect(item: any) {
    const newArr = [];
    this.benifitsListToPost.forEach(e => {
      if (e.id !== item.id) {
        newArr.push(e);
      }
    });
    this.benifitsListToPost = newArr;
  }

  onDeselectAllBenifits(item: any) {
    this.benifitsListToPost = [];
  }

  onRequirmentSelect(item: any) {
    this.requirmentListToPost.push(item);
  }

  onSelectAllRequirments(item: any) {
    this.requirmentListToPost = item;
  }

  onRequirmentDeselect(item: any) {
    const newArr = [];
    this.requirmentListToPost.forEach(e => {
      if (e.id !== item.id) {
        newArr.push(e);
      }
    });
    this.requirmentListToPost = newArr;
  }


  onMetricSelect(ingredient:IMeasuredIngredient,item: any) {
    console.log("measured ingredient passed in??");
    console.log(ingredient);
    ingredient.metric = item;
    console.log("metric id now: " + ingredient.metric);
  }

  onMetricDeselect(item: any){
    this.selectedMetricToPush = null;
  }

  onMetricChange(metricID: any, ingredient :IMeasuredIngredient){
    console.log("metric passed in??");
    console.log(metricID);
    console.log("measured ingredient passed in??");
    console.log(ingredient);
    let metricFound = this.metricsList.filter(item => item.id === metricID)[0];
    console.log("metric");
    console.log(metricFound);
    ingredient.metric = metricFound;
  }

  onDeselectAllRequirments(item: any) {
    this.requirmentListToPost = [];
  }

  changeRecipeTitle() {
    this.isRecipeTitleChange = true;
  }

  loadMealTypes() {
    this.rest.apiGet('api/recipes/allMealTypes').subscribe((res: any[]) => {
        this.categoriesList = res;
      }
    );
  }

  loadDietaryCategories() {
    this.rest.apiGet('api/recipes/allDietaryCategories').subscribe((res: any[]) => {
        this.requirementsList = res;
      }
    );
  }

  loadHealthBenefits() {
    this.rest.apiGet('api/recipes/allNutritionalBenefits').subscribe((res: any[]) => {
        this.benifitsList = res;
      }
    );
  }

  loadCuisines() {
    this.rest.apiGet('api/recipes/allCuisines').subscribe((res: any[]) => {
        this.cuisineList = res;
      }
    );
  }

  loadMetrics(){
    this.rest.apiGet('api/recipes/allMetrics').subscribe((res: any[]) => {
      this.metricsList = res;
    }
  );
  }


  getArrayOfLength(len: number) {
    return this.maxArr.slice(0, len);
  }

  addIngredientToList() {
    //this.howManyIngredients++;
    //this.maxArr.push(this.maxArr.length + 1);
    this.ingredientsList.push(this.createNewIngredient());
  }

  deleteIngredientFromList(index) {
    if (this.howManyIngredients !== 1) {
      this.ingredientsList.splice(index, 1);
      this.howManyIngredients--;
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(image) {
    console.log('image', image);
    this.croppedImage = image;
    this.f = image;
  }

  imageLoaded() {
    // show cropper
  }

  loadImageFailed() {
    // show message
  }

  async saveRecipe(){
    console.log("this is the cusinesList");
    console.log(this.selectedCuisines);
    this.modifyListsToJson();  

    let returningRecipe : IRecipe ={
      id:this.recipeID,
      defaultImageID: this.defaultImageID,
      cuisines: this.selectedCuisines,
      nutritionalBenefits: this.benifitsListToPost,
      dietaryCategories: this.requirmentListToPost,
      instructions: this.method,  
      mealTypes: this.categoriesListToPost,
      measuredIngredients: this.ingredientsListToPost,
      name: this.recipeTitle
    };


    // await this.rest.apiPut('session/recipe/' +this.recipeID, {
    //   id:this.recipeID,
    //   defaultImageID: this.defaultImageID,
    //   cuisines: this.cusinesListToPost,
    //   nutritionalBenefits: this.benifitsListToPost,
    //   dietaryCategories: this.requirmentListToPost,
    //   instructions: this.method,  
    //   mealTypes: this.categoriesListToPost,
    //   measuredIngredients: this.ingredientsListToPost,
    //   name: this.recipeTitle
    // }).toPromise();

    console.log("Going to pass through");
    console.log(returningRecipe);
    await this.rest.apiPut('session/recipe/' +this.recipeID, returningRecipe).toPromise();

    console.log("saveRecipe");

    if(this.cropedFile){
      const frmData = new FormData();
      frmData.append('file', this.cropedFile, 'RecipeImage' + this.recipeID + '.png');
      this.rest.apiPost(`api/recipes/UploadRecipeImage/{this.recipeID}`, frmData).subscribe(re => {console.log(re);}, err => {
          if (err.status === 200) {
            this.router.navigateByUrl('');
          }
      });
    }

  }


  modifyListsToJson(){
    this.cusinesListToPost = this.cusinesListToPost.map(e => {
      return {
        id: e.id
      };
    });

    this.categoriesListToPost = this.selectedCategories.map(e => {
      return {
        id: e.id
      };
    });

    this.benifitsListToPost = this.benifitsListToPost.map(e => {
      return {
        id: e.id
      };
    });

    this.requirmentListToPost = this.requirmentListToPost.map(e => {
      return {
        id: e.id
      };
    });

    //this.ingredientsListToPost = this.ingredientsList.slice(1).map((e: any) => {
    this.ingredientsListToPost = this.ingredientsList.map((e: any) => {
      return {
        id:e.id,
        amount: e.amount,
        metric: {id: e.metric.id, name: e.metric.name, code: e.metric.code },
        name: e.name
      };
    });
  }

  postRecipe() {
     this.modifyListsToJson();
  
      this.rest.apiPost('session/createRecipe', {
        defaultImageID: null,
        cuisines: this.cusinesListToPost,
        nutritionalBenefits: this.benifitsListToPost,
        dietaryCategories: this.requirmentListToPost,
        instructions: this.method,  
        mealTypes: this.categoriesListToPost,
        measuredIngredients: this.ingredientsList,
        name: this.recipeTitle
      }).subscribe(e => {
        const frmData = new FormData();
        frmData.append('file', this.cropedFile, 'RecipeImage' + e + '.png');
        this.rest.apiPost(`api/recipes/UploadRecipeImage/${e}`, frmData).subscribe(re => {
          console.log(re);
        }, err => {
          if (err.status === 200) {
            this.router.navigateByUrl('');
          }
        });
      });
    }
  


  // postRecipe() {
  //   this.cusinesListToPost = this.cusinesListToPost.map(e => {
  //     return {
  //       id: e.id
  //     };
  //   });

  //   this.selectedCategories = this.selectedCategories.map(e => {
  //     return {
  //       id: e.id
  //     };
  //   });

  //   this.benifitsListToPost = this.benifitsListToPost.map(e => {
  //     return {
  //       id: e.id
  //     };
  //   });

  //   this.requirmentListToPost = this.requirmentListToPost.map(e => {
  //     return {
  //       id: e.id
  //     };
  //   });

  //   this.ingredientsListToPost = this.ingredientsList.slice(1).map((e: any) => {
  //     return {
  //       amount: e.amount,
  //       metric: {id: e.metric},
  //       name: e.name
  //     };
  //   });

  //   this.rest.apiPost('session/createRecipe', {
  //     defaultImageID: null,
  //     cuisines: this.cusinesListToPost,
  //     nutritionalBenefits: this.benifitsListToPost,
  //     dietaryCategories: this.requirmentListToPost,
  //     instructions: this.method,  
  //     mealTypes: this.categoriesListToPost,
  //     measuredIngredients: this.ingredientsListToPost,
  //     name: this.recipeTitle
  //   }).subscribe(e => {
  //     const frmData = new FormData();
  //     frmData.append('file', this.cropedFile, 'RecipeImage' + e + '.png');
  //     this.rest.apiPost(`api/recipes/UploadRecipeImage/${e}`, frmData).subscribe(re => {
  //       console.log(re);
  //     }, err => {
  //       if (err.status === 200) {
  //         this.router.navigateByUrl('');
  //       }
  //     });
  //   });
  // }






  imageCroppedFile($event: File) {
    console.log('croped file to back', $event);
    this.cropedFile = $event;
  }

  recipeProtocol():any{
    const fakeResp = {
      'defaultImageID': null,
      'cuisines': [
        {
          'id': 2
        }
      ],
      'nutritionalBenefits': [
        {
          'id': 3
        }
      ],
      'dietaryCategories': [
        {
          'id': 1
        }
      ],
      'instructions': [
        {
          'descText': 'Instruction 1',
          'sortID': '1'
        },
        {
          'descText': 'Instruction 2',
          'sortID': '2'
        }
      ],
      'mealTypes': [{'id': 2}],
      'measuredIngredients': [
        {
          'amount': '15',
          'metric': {'id': 1},
          'name': 'Ingredient 111'
        }
      ],
      'name': 'Ra Ra Recipe'
    };
    return fakeResp;
  }

  
}
