import { TestBed, inject } from '@angular/core/testing';

import { MyRecipeService } from './my-recipe.service';

describe('MyRecipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyRecipeService]
    });
  });

  it('should be created', inject([MyRecipeService], (service: MyRecipeService) => {
    expect(service).toBeTruthy();
  }));
});
