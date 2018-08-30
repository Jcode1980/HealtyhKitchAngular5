import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RestService} from '../rest.service';
import {Router, ActivatedRoute} from '@angular/router';
import { IRecipe } from '../../models/IRecipe';
import {IMetric} from '../../models/IMetric';
import { IMeasuredIngredient } from '../../models/IMeasuredIngredient';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddRecipeComponent implements OnInit {
  public apiURL = environment.apiUrl;
  recipeID;
  defaultImageID;
  recipeTitle = 'Title';
  numServings:number;
  readyInMins:number;
  descText:string;
  isRecipeTitleChange = false;

  isModalOpen = false;

  method: string;
  cropedFile: File;

  f: any;

  ingredientsList = [];

  imageChangedEvent: any = '';
  croppedImage: any = '';

  cuisineList = [];
  selectedCuisines = [];

  categoriesList = [];
  selectedCategories = [];

  benifitsList = [];
  selectedBenifits = [];

  requirementsList = [];
  selectedRequirments = [];

  metricsList:Array<IMetric> = [];

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };

  // constructor(private rest: RestService, private router: Router ) {
  // }

  constructor(private rest: RestService, private activatedRouter: ActivatedRoute, private router: Router ) {
  }

  async ngOnInit() {
    await this.loadStaticData();

    const id = +this.activatedRouter.snapshot.paramMap.get('id');
    if(id){
      await this.initializeRecipeData();
    }
    else{
       console.log("no recipe id found");
    }

    console.log("ingredients length is:");
    console.log(this.ingredientsList.length);
    if(this.ingredientsList.length === 0){
      console.log("got here ingredients");
      console.log(this.metricsList[0]);
      this.ingredientsList = [this.createNewIngredient()];
    }

  }

  async loadStaticData(){
    this.loadMealTypes();
    this.loadDietaryCategories();
    this.loadHealthBenefits();
    this.loadCuisines();
    this.metricsList =  await this.getMetrics();
  }

  async initializeRecipeData() {
    console.log("initializeRecipeData");
    const id = +this.activatedRouter.snapshot.paramMap.get('id');
    let currentRecipe :IRecipe;
    currentRecipe = await this.rest.apiGet<IRecipe>(`api/recipes/${id}`).toPromise();
    console.log("got recipe");
    console.log(currentRecipe);
    this.recipeTitle = currentRecipe.name;
    this.numServings = currentRecipe.numServings;
    this.readyInMins = currentRecipe.readyInMins;
    this.descText = currentRecipe.descText;
    this.method = currentRecipe.instructions;
    this.ingredientsList = currentRecipe.measuredIngredients;


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
      amount: null,
      name: null,
      metric: this.metricsList[0]
    }

    return newIngredient;
  }

  onCuisineSelect(item: any) {
    console.log("Going to select cuisine");
    console.log(item);
    //this.cusinesListToPost.push(item);
    if(!this.itemInArray(item, this.selectedCuisines)){
      this.selectedCuisines.push(item);
    }
    console.log(this.selectedCuisines);
  }

  private itemInArray(item:any, theArray:Array<any>):boolean {
    let foundArray:Array<any> = theArray.filter(obj => obj.id === item.id);
    return foundArray.length > 0;
  }
  


  onCuisineDeselect(item: any) {
    console.log("Going to deselect cuisine");
    console.log(item);
    this.selectedCuisines = this.selectedCuisines.filter(obj => obj.id !== item.id);
    console.log("filtered c list is");
    console.log(this.selectedCuisines);
    
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
    if(!this.itemInArray(item, this.selectedCategories)){
      this.selectedCategories.push(item);
    }
  }

  onSelectAllCategories(items: any) {
    //this.categoriesListToPost = items;
    this.selectedCategories= items;
  }

  onCategoryDeselect(item: any) {
    this.selectedCategories = this.selectedCategories.filter(obj => obj.id !== item.id);
  }

  onDeselectAllCategories() {
    this.selectedCategories = [];
  }

  onBenefitSelect(item: any) {
    if(!this.itemInArray(item, this.selectedRequirments)){
      this.selectedRequirments.push(item);
    }
  }

  onSelectAllBenifits(item: any) {
    this.selectedBenifits = item;
  }

  onBenefitDeselect(item: any) {
    this.selectedBenifits = this.selectedBenifits.filter(obj => obj.id !== item.id);
  }

  onDeselectAllBenifits() {
    this.selectedBenifits = [];
  }

  onRequirmentSelect(item: any) {
    if(!this.itemInArray(item, this.selectedRequirments)){
      this.selectedRequirments.push(item);
    }
  }

  onSelectAllRequirments(item: any) {
    this.selectedRequirments = item;
  }

  onRequirmentDeselect(item: any) {
    this.selectedRequirments = this.selectedRequirments.filter(obj => obj.id !== item.id);
  }

  onDeselectAllRequirments() {
    this.selectedRequirments = [];
  }


  // onMetricSelect(ingredient:IMeasuredIngredient,item: any) {
  //   console.log("measured ingredient passed in??");
  //   console.log(ingredient);
  //   ingredient.metric = item;
  //   console.log("metric id now: " + ingredient.metric);
  // }


  onMetricChange(metricID: any, ingredient :IMeasuredIngredient){

    console.log("measured ingredient passed in??");
    console.log(ingredient);
    let metricFound = this.metricsList.filter(item => item.id === metricID)[0];
    console.log("metric");
    console.log(metricFound);
    ingredient.metric = metricFound;
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

  async getMetrics():Promise<Array<IMetric>>{
    return this.rest.apiGet<Promise<Array<IMetric>>>('api/recipes/allMetrics').toPromise();
  }


  addIngredientToList() {
    //this.howManyIngredients++;
    //this.maxArr.push(this.maxArr.length + 1);
    this.ingredientsList.push(this.createNewIngredient());
  }
o
  deleteIngredientFromList(index) {
    if (this.ingredientsList.length !== 1) {
      this.ingredientsList.splice(index, 1);
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

    const returningRecipe:any = this.recipeDataToReturn();
    console.log("Going to pass through");
    console.log(returningRecipe);
    await this.rest.apiPut('session/recipe/' +this.recipeID, returningRecipe).toPromise();

    if(this.cropedFile){
      console.log("going to upload cropedFile");
      const frmData = new FormData();
      frmData.append('file', this.cropedFile, 'RecipeImage' + this.recipeID + '.png');
      this.rest.apiPost(`api/recipes/UploadRecipeImage/${this.recipeID}`, frmData).subscribe(re => {console.log(re);}, err => {
          if (err.status === 200) {
            this.router.navigateByUrl('');
          }
      });
    }

  }

  idArrayGenerator(theArray:Array<any>):Array<number>{
    theArray.map(e => {
      return {
        id: e.id
      };
    });

    return theArray;
  }


  recipeDataToReturn():any{
    let cusinesListToPost = this.idArrayGenerator(this.selectedCuisines);
    let categoriesListToPost = this.idArrayGenerator(this.selectedCategories);
    let benifitsListToPost = this.idArrayGenerator(this.selectedBenifits);
    let requirmentListToPost = this.idArrayGenerator(this.selectedRequirments);

    let ingredientsListToPost = this.ingredientsList.map((e: any) => {
      return {
        id: e.id,
        amount: e.amount,
        metric: { id: e.metric.id, name: e.metric.name, code: e.metric.code },
        name: e.name
      };
    });

    let returningRecipe : any ={
      id:this.recipeID,
      defaultImageID: this.defaultImageID,
      numServings: this.numServings,
      readyInMins: this.readyInMins,
      descText: this.descText,
      cuisines: cusinesListToPost,
      nutritionalBenefits: benifitsListToPost,
      dietaryCategories: requirmentListToPost,
      instructions: this.method,
      mealTypes: categoriesListToPost,
      measuredIngredients: ingredientsListToPost,
      name: this.recipeTitle
    };

    return returningRecipe;
  }

  postRecipe() {
    this.rest.apiPost('session/recipe/createRecipe', this.recipeDataToReturn()).subscribe(e => {
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

  //     this.rest.apiPost('session/createRecipe', {
  //       defaultImageID: null,
  //       cuisines: this.cusinesListToPost,
  //       nutritionalBenefits: this.benifitsListToPost,
  //       dietaryCategories: this.requirmentListToPost,
  //       instructions: this.method,
  //       mealTypes: this.categoriesListToPost,
  //       measuredIngredients: this.ingredientsList,
  //       name: this.recipeTitle
  //     }).subscribe(e => {
  //       const frmData = new FormData();
  //       frmData.append('file', this.cropedFile, 'RecipeImage' + e + '.png');
  //       this.rest.apiPost(`api/recipes/UploadRecipeImage/${e}`, frmData).subscribe(re => {
  //         console.log(re);
  //       }, err => {
  //         if (err.status === 200) {
  //           this.router.navigateByUrl('');
  //         }
  //       });
  //     });
  //   }

  imageCroppedFile($event: File) {
    console.log('croped file to back', $event);
    this.cropedFile = $event;
  }

  recipeImageSource():string{
    let imageSource;

    //console.log(this.defaultImageID);
    //console.log(this.defaultImageID !==null);

    if(this.croppedImage != ''){
      //console.log("444444");
      imageSource = this.croppedImage
    }
    else if(this.defaultImageID){
      //console.log("333333");
      imageSource = this.apiURL +"files/RecipeImage/"+ this.defaultImageID +"?quality=2";
    }
    //console.log("returning imagesource");
    //console.log(imageSource);
    return imageSource;

  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }



}
