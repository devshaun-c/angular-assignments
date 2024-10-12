import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatStepperModule } from "@angular/material/stepper";
import { Subject } from "rxjs";
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { StepperComponent } from "src/app/shared/components/stepper/stepper.component";
import { Step1FormComponent } from "./components/step-1-form/step-1-form.component";
import { Step2FormComponent } from "./components/step-2-form/step-2-form.component";
import { Step3FormComponent } from "./components/step-3-form/step-3-form.component";
import { ICompany } from "src/interface/interface";
import { SubmitSuccessComponent } from "./components/submit-success/submit-success.component";

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
	formsValidity: boolean[] = [];
	currentStep: number = 0;
	isLoading: boolean = false;
	isSuccess: boolean = false;
	_onDestroy = new Subject<void>();

	constructor() {}

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
		this.updateFormsValidity();
	}

	// Update the validity of all forms
	updateFormsValidity() {
		this.formsValidity = [
			this.firstFormGroup.valid,
			this.secondFormGroup.valid,
			true,
		];
		console.log(this.formsValidity);
	}

	onStepChanged(stepIndex: number) {
		this.currentStep = stepIndex;
	}

	validateCurrentForm(isLastStep: boolean) {
		const allFormData = {
			...this.firstFormGroup.value,
			...this.secondFormGroup.value,
		};
		this.allData = allFormData;
		this.isLoading = true;

		const currentForm = this.getCurrentForm();
		if (currentForm) {
			Object.keys(currentForm.controls).forEach((field) => {
				const control = currentForm.get(field);
				control?.markAsTouched({ onlySelf: true });
				control?.updateValueAndValidity();
			});
		}
		this.updateFormsValidity();

		if (currentForm?.valid) {
			//Async form validation to be performed here.
		}

		if (isLastStep) {
			console.log("Form Data:", allFormData);
			//Async form submission to be performed here.
			this.isSuccess = true;
		}
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

	onSubmit() {
		this.isLoading = true;
		const allFormData = {
			step1: this.firstFormGroup.value,
			step2: this.secondFormGroup.value,
		};

		console.log("All Form Data:", allFormData);

		// You can also use JSON.stringify to format it nicely in the console
		console.log(
			"All Form Data (formatted):",
			JSON.stringify(allFormData, null, 2)
		);

		// Proceed with submission logic
	}

	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}
}
