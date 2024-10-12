import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatStepperModule } from "@angular/material/stepper";
import { catchError, finalize, Observable, of, Subject } from "rxjs";
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { StepperComponent } from "src/app/shared/components/stepper/stepper.component";
import { CompanyService } from "src/app/shared/services/company.service";
import { ICompany } from "src/interface/interface";
import { Step1FormComponent } from "./components/step-1-form/step-1-form.component";
import { Step2FormComponent } from "./components/step-2-form/step-2-form.component";
import { Step3FormComponent } from "./components/step-3-form/step-3-form.component";
import { SubmitSuccessComponent } from "./components/submit-success/submit-success.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
	selector: "app-create-page",
	standalone: true,
	imports: [
		CommonModule,
		HeaderComponent,
		ReactiveFormsModule,
		MatStepperModule,
		MatButtonModule,
		StepperComponent,
		Step1FormComponent,
		Step2FormComponent,
		Step3FormComponent,
		SubmitSuccessComponent,
		MatProgressSpinnerModule,
	],
	templateUrl: "./create-page.component.html",
	styleUrls: ["./create-page.component.scss"],
})
export class CreatePageComponent implements OnInit, OnDestroy {
	steps = [
		{ label: "Company Info" },
		{ label: "Additional info" },
		{ label: "Review" },
	];
	allData: ICompany;
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	currentStep: number = 0;
	isLoading: boolean = false;
	isSuccess: boolean = false;
	_onDestroy = new Subject<void>();

	constructor(public companyService: CompanyService) {}

	ngOnInit(): void {
		this.firstFormGroup = new FormGroup({
			companyName: new FormControl(null, [Validators.required]),
			companyAddress: new FormControl(null, [Validators.required]),
			companyRepName: new FormControl(null, [Validators.required]),
			email: new FormControl(null, [
				Validators.required,
				Validators.email,
			]),
		});
		this.secondFormGroup = new FormGroup({
			description: new FormControl(null, [Validators.required]),
			products: new FormControl(null, [Validators.required]),
		});
	}

	nextStep() {
		const allFormData = {
			...this.firstFormGroup.value,
			...this.secondFormGroup.value,
		};
		this.allData = allFormData;
		this.isLoading = true;

		this.isCurrentFormValid().subscribe({
			next: (isValid) => {
				this.isLoading = false;

				if (isValid && this.currentStep < this.steps.length - 1) {
					this.currentStep++;
				} else if (this.isLastStep) {
					this.submitForm();
				}
			},
			error: (err) => {
				this.isLoading = false;
				console.log(err.message);
			},
		});
	}

	prevStep() {
		if (this.currentStep > 0) {
			this.currentStep--;
		}
	}

	isCurrentFormValid(): Observable<boolean> {
		const currentForm = this.getCurrentForm();
		if (!currentForm) {
			return of(false);
		}

		//Manually trigger form validation - Needed cause forms are in own components
		Object.keys(currentForm.controls).forEach((field) => {
			const control = currentForm.get(field);
			control?.markAsTouched({ onlySelf: true });
			control?.updateValueAndValidity();
		});

		// Perform form input validation first
		if (!currentForm.valid) {
			return of(false);
		}

		// Perform async server validation
		return this.checkIsValidData().pipe(
			catchError((err) => {
				console.log(err.message);
				return of(false);
			})
		);
	}

	checkIsValidData(): Observable<boolean> {
		this.isLoading = true;
		return this.companyService.validateData().pipe(
			finalize(() => {
				this.isLoading = false;
			})
		);
	}

	submitForm() {
		console.log("Form Data:", this.allData);
		this.isSuccess = true;
	}

	// Get the current form based on the step
	getCurrentForm(): FormGroup | null {
		if (this.currentStep === 0) {
			return this.firstFormGroup;
		} else if (this.currentStep === 1) {
			return this.secondFormGroup;
		}
		return null;
	}

	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}

	get isLastStep(): boolean {
		return this.currentStep === this.steps.length - 1;
	}
}
