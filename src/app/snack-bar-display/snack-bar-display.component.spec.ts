import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarDisplayComponent } from './snack-bar-display.component';

describe('SnackBarDisplayComponent', () => {
  let component: SnackBarDisplayComponent;
  let fixture: ComponentFixture<SnackBarDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
