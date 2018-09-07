import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsDisplayComponent } from './stars-display.component';

describe('StarsDisplayComponent', () => {
  let component: StarsDisplayComponent;
  let fixture: ComponentFixture<StarsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
