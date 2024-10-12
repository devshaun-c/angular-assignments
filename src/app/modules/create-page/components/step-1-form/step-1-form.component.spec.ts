import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1FormComponent } from './step-1-form.component';

describe('Step1FormComponent', () => {
  let component: Step1FormComponent;
  let fixture: ComponentFixture<Step1FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Step1FormComponent]
    });
    fixture = TestBed.createComponent(Step1FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
