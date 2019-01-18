import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookBookViewComponent } from './cook-book-view.component';

describe('CookBookViewComponent', () => {
  let component: CookBookViewComponent;
  let fixture: ComponentFixture<CookBookViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookBookViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookBookViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
