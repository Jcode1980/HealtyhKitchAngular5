import {Component, OnInit, ViewEncapsulation, ViewChild, Input} from '@angular/core';
import {RestService} from '../rest.service';
import {Router, ActivatedRoute} from '@angular/router';
import { IRecipe } from '../../models/IRecipe';
import { Recipe } from '../../models/Recipe';
import {IMetric} from '../../models/IMetric';
import { IMeasuredIngredient } from '../../models/IMeasuredIngredient';
import {environment} from '../../environments/environment';
import { IIngredientSubHeading } from '../../models/IIngredientSubHeading';
import { RecipeStatus } from '../../models/RecipeStatus';
import {NgForm} from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
  encapsulation: ViewEncapsulation.None
})




export class AddRecipeComponent implements OnInit {
  @Input() currentRecipe:Recipe;
  @ViewChild('myForm') private myForm: NgForm;
  apiURL = environment.apiUrl;
  
  //currentRecipe : Recipe;
  ingredientListings: Array<any> = [];

  isRecipeTitleChange = false;
  isModalOpen = false;

  cropedFile: File;
  f: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  cuisineList = [];
  
  benifitsList = [];
  mealTypesList = [];
  dietaryCategoriesList = [];
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

  constructor(private rest: RestService, private activatedRouter: ActivatedRoute, private router: Router, private location: Location ) {
  }

  async ngOnInit() {
    await this.loadStaticData();

    //const id = +this.activatedRouter.snapshot.paramMap.get('id');
    if(this.currentRecipe != null){
      await this.initializeRecipeData();
    }
    else{
       this.currentRecipe = new Recipe(null);
    }

    if(this.currentRecipe.ingredientListing().length > 0){
      
      this.ingredientListings = this.currentRecipe.ingredientListing();
      console.log("ingredient listings are");
      console.log(this.ingredientListings);
    }
    else{
      this.ingredientListings.push(this.createNewIngredient());
    }

  }

  async loadStaticData(){
    this.loadMealTypes();
    this.loadDietaryCategories();
    this.loadHealthBenefits();
    this.loadCuisines();
    this.metricsList =  await this.getMetrics();
  }

  ingredientListingsArray():Array<any>{
    return this.ingredientListings;
  }

  // async initializeRecipeData() {
  //   console.log("initializeRecipeData");
  //   const id = +this.activatedRouter.snapshot.paramMap.get('id');
  //   let currentRecipe :IRecipe;
  //   currentRecipe = await this.rest.apiGet<IRecipe>(`api/recipes/${id}`).toPromise();
  //   console.log("got recipe");
  //   console.log(currentRecipe);
  //   this.recipeTitle = currentRecipe.name;
  //   this.numServings = currentRecipe.numServings;
  //   this.readyInMins = currentRecipe.readyInMins;
  //   this.descText = currentRecipe.descText;
  //   this.method = currentRecipe.instructions;
  //   this.currentRecipe.measuredIngredients = currentRecipe.measuredIngredients;


  //   this.defaultImageID=currentRecipe.defaultImageID;

  //   this.recipeID = currentRecipe.id;
  //   this.currentRecipe.nutritionalBenefits = currentRecipe.nutritionalBenefits;
  //   this.currentRecipe.nutritionalBenefits = currentRecipe.dietaryCategories;
  //   this.currentRecipe.cuisines = currentRecipe.cuisines;
  //   this.currentRecipe.dietaryCategories = currentRecipe.mealTypes;

  // }

  async initializeRecipeData() {
    console.log("initializeRecipeData");
    const id = +this.activatedRouter.snapshot.paramMap.get('id');
    let iRecipe:IRecipe = await this.rest.apiGet<Recipe>(`api/recipes/${id}`).toPromise();
    console.log("got Irecipe");
    console.log(iRecipe);
    this.currentRecipe = new Recipe(iRecipe);
    console.log("got recipe");
    console.log(this.currentRecipe);
  }




  private itemInArray(item:any, theArray:Array<any>):boolean {
    let foundArray:Array<any> = theArray.filter(obj => obj.id === item.id);
    return foundArray.length > 0;
  }
  


  //****** CUSINE SELECT FUNCTIONS   ********/

  onCuisineSelect(item: any) {
    console.log("Going to select cuisine");
    console.log(item);
    if(!this.itemInArray(item, this.currentRecipe.cuisines)){
      this.currentRecipe.cuisines.push(item);
    }
    console.log(this.currentRecipe.cuisines);
  }

  onCuisineDeselect(item: any) {
    console.log("Going to deselect cuisine");
    console.log(item);
    this.currentRecipe.cuisines = this.currentRecipe.cuisines.filter(obj => obj.id !== item.id);
    console.log("filtered c list is");
    console.log(this.currentRecipe.cuisines);
    
  }

  onSelectAllCuisines(items: any) {
    //this.cusinesListToPost = items;
    this.currentRecipe.cuisines = items;
  }

  onDeselectAllCuisines() {
    this.currentRecipe.cuisines = [];
  }

  //****** MealType SELECT FUNCTIONS   ********/

  onMealTypeSelect(item: any) {
    console.log("adding meal Type");
    console.log(item);
    if(!this.itemInArray(item, this.currentRecipe.mealTypes)){
      this.currentRecipe.mealTypes.push(item);
    }
  }

  onSelectAllMealTypes(items: any) {
    this.currentRecipe.mealTypes= items;
  }

  onMealTypeDeselect(item: any) {
    this.currentRecipe.mealTypes = this.currentRecipe.mealTypes.filter(obj => obj.id !== item.id);
  }

  onDeselectAllMealTypes() {
    this.currentRecipe.mealTypes = [];
  }

  //********* NUTIRITIONAL BENEFIT SELECT FUNCTIONS *****************/
  onBenefitSelect(item: any) {
    if(!this.itemInArray(item, this.currentRecipe.nutritionalBenefits)){
      this.currentRecipe.nutritionalBenefits.push(item);
    }
  }

  onSelectAllBenifits(item: any) {
    this.currentRecipe.nutritionalBenefits = item;
  }

  onBenefitDeselect(item: any) {
    this.currentRecipe.nutritionalBenefits = this.currentRecipe.nutritionalBenefits.filter(obj => obj.id !== item.id);
  }

  onDeselectAllBenifits() {
    this.currentRecipe.nutritionalBenefits = [];
  }

 //********* DIETARY CATEGORY SELECT FUNCTIONS *****************/

  onDietaryCategorySelect(item: any) {
    if(!this.itemInArray(item, this.currentRecipe.dietaryCategories)){
      this.currentRecipe.dietaryCategories.push(item);
    }
  }

  onSelectAllDietaryCategories(item: any) {
    this.currentRecipe.dietaryCategories = item;
  }

  onDietaryCategoriesDeselect(item: any) {
    this.currentRecipe.dietaryCategories = this.currentRecipe.dietaryCategories.filter(obj => obj.id !== item.id);
  }

  onDeselectAllDietaryCategories() {
    this.currentRecipe.dietaryCategories = [];
  }


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
        this.mealTypesList = res;
      }
    );
  }

  loadDietaryCategories() {
    this.rest.apiGet('api/recipes/allDietaryCategories').subscribe((res: any[]) => {
        this.dietaryCategoriesList = res;
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

  addSubHeadingToList(index:number){
    console.log("add to index : " + index);
    this.ingredientListingsArray().splice(index, 0, this.createNewSubHeading());
  }

  addIngredientToList(index:number) {
    console.log("add to index : " + index);

    this.ingredientListingsArray().splice(index, 0, this.createNewIngredient());
  }

  deleteIngredientFromList(index:number) {
    console.log("remove the index : " + index);
    if (this.ingredientListingsArray().length !== 1) {
      this.ingredientListingsArray().splice(index,1);
    }
  }

  addIngredient(index : number) : IMeasuredIngredient{
    let newIngredient : IMeasuredIngredient = this.createNewIngredient();
    return newIngredient;
  }

  // addSubHeading(subHeading : IIngredientSubHeading){
  //   this.reOrderSubHeadingAndMeasuredIngredientsArray(subHeading.sortID)
  //   this.ingredientSubHeadings.push(subHeading);
  // }

  private createNewIngredient():IMeasuredIngredient{
    let newIngredient:IMeasuredIngredient = {
      id:null,
      amount: null,
      name: null,
      metric: null,
      sortID: null
    }

    return newIngredient;
  }

  private createNewSubHeading() : IIngredientSubHeading{
    return {
      id:null,
      name: null,
      sortID: null
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

  submitRecipeForApproval(){
    if(this.myForm.valid){
      console.log("submitting Recipe for Approval")
      //Send email to Approver
      //set Recipe Status to Submitted
      this.currentRecipe.recipeStatus = RecipeStatus.submittedStatus();
      
      //save the recipe
      this.saveRecipe();
      
      //Take user back to previous page.
      this.location.back();
    }
    else{
      console.log("form not valid");
      const controls = this.myForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched()); 
    }
  }


  publishRecipe(){
    if(this.myForm.valid){
      this.currentRecipe.recipeStatus = RecipeStatus.publishedStatus();
      
      //save the recipe
      this.saveRecipe();
      
      //email creator about the recipe being published
      
      this.location.back();
    }
  }
  

  async saveRecipe(){
    console.log("this is the cusinesList");
    console.log(this.currentRecipe.cuisines);
    
    console.log(this.currentRecipe);

    this.ingredientListingsArray
    this.currentRecipe.saveIngredientListing(this.ingredientListingsArray());
    const returningRecipe:any = this.currentRecipe.recipeDataToReturn();
    console.log("Going to pass through");
    console.log(returningRecipe);
    
    let recipeID = null;
    if(this.currentRecipe.id != null){
      await this.rest.apiPut('session/recipe/' +this.currentRecipe.id, returningRecipe).toPromise();
    }
    else{
      await this.rest.apiPost<number>('session/recipe/createRecipe', this.currentRecipe.recipeDataToReturn()).subscribe(e=> this.currentRecipe["id"] = e);      
    }

    recipeID = this.currentRecipe.id;

    if(this.cropedFile){
      console.log("going to upload cropedFile using recipeID  " + recipeID);
      const frmData = new FormData();
      frmData.append('file', this.cropedFile, 'RecipeImage' + recipeID + '.png');
      this.rest.apiPost(`api/recipes/UploadRecipeImage/${recipeID}`, frmData).subscribe(re => {console.log(re);}, err => {
          if (err.status === 200) {
            this.router.navigateByUrl('');
          }
      });
    }
  }



  // postRecipe() {
  //   this.rest.apiPost('session/recipe/createRecipe', this.currentRecipe.recipeDataToReturn()).subscribe(e => {
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

  recipeImageSource():string{
    let imageSource;


    if(this.croppedImage != ''){
      imageSource = this.croppedImage
    }
    else if(this.currentRecipe.defaultImageID){
      //console.log("333333");
      imageSource = this.apiURL +"files/RecipeImage/"+ this.currentRecipe.defaultImageID +"?quality=2";
    }
    
    return imageSource;

  }

  

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }





}
