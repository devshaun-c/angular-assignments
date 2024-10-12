import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSuccessComponent } from './submit-success.component';

describe('SubmitSuccessComponent', () => {
  let component: SubmitSuccessComponent;
  let fixture: ComponentFixture<SubmitSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubmitSuccessComponent]
    });
    fixture = TestBed.createComponent(SubmitSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
