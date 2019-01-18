import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookbooksListComponent } from './cookbooks-list.component';

describe('CookbooksListComponent', () => {
  let component: CookbooksListComponent;
  let fixture: ComponentFixture<CookbooksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookbooksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookbooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
