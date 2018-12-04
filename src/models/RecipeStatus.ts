export class RecipeStatus {  
    
    name: string;
    id: number;
  
    constructor(name: string, id: number) {
        this.id = id;
        this.name = name;
    }

    static newStatus(){
        return new RecipeStatus("New", 1);
    }

    static submittedStatus(){
        return new RecipeStatus("Submitted", 2);
    }

    static publishedStatus(){
        return new RecipeStatus("Publised", 3);
    }

  

}
