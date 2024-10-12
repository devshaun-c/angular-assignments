import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2FormComponent } from './step-2-form.component';

describe('Step2FormComponent', () => {
  let component: Step2FormComponent;
  let fixture: ComponentFixture<Step2FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Step2FormComponent]
    });
    fixture = TestBed.createComponent(Step2FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
