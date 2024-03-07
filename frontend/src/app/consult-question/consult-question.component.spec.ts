import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultQuestionComponent } from './consult-question.component';

describe('ConsultQuestionComponent', () => {
  let component: ConsultQuestionComponent;
  let fixture: ComponentFixture<ConsultQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultQuestionComponent]
    });
    fixture = TestBed.createComponent(ConsultQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
