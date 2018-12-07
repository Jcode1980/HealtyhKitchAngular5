import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentRecipeComponent } from './parent-recipe.component';

describe('ParentRecipeComponent', () => {
  let component: ParentRecipeComponent;
  let fixture: ComponentFixture<ParentRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
