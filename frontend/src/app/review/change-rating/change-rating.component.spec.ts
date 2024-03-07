import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRatingComponent } from './change-rating.component';

describe('ChangeRatingComponent', () => {
  let component: ChangeRatingComponent;
  let fixture: ComponentFixture<ChangeRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeRatingComponent]
    });
    fixture = TestBed.createComponent(ChangeRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
