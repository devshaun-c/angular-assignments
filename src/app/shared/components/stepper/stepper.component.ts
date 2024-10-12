import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: "app-stepper",
	standalone: true,
	imports: [CommonModule, MatIconModule, MatButtonModule],
	templateUrl: "./stepper.component.html",
	styleUrls: ["./stepper.component.scss"],
})
export class StepperComponent {
	@Input() steps: { label: string }[] = [];
	@Input() formsValidity: boolean[] = [];
	@Output() formSubmitAttempt = new EventEmitter<boolean>(false);
	@Output() stepChanged = new EventEmitter<number>();

	currentStep: number = 0;
	isCompleted: boolean = false;

	isCurrentFormValid(): boolean {
		return this.formsValidity[this.currentStep];
	}

	validateAndNextStep() {
		this.formSubmitAttempt.emit(); // Notify the parent component to mark form as touched and validate
		// Use setTimeout to ensure form validity is updated before we check it
		setTimeout(() => {
			if (this.formsValidity[this.currentStep]) {
				this.nextStep();
			}
		}, 0);
	}

	nextStep() {
		if (
			this.isCurrentFormValid() &&
			this.currentStep < this.steps.length - 1
		) {
			this.currentStep++;
			this.stepChanged.emit(this.currentStep);
		} else if (this.isLastStep) {
			this.isCompleted = true;
			this.submit();
		}
	}

	prevStep() {
		if (this.currentStep > 0) {
			this.currentStep--;
			this.stepChanged.emit(this.currentStep);
		}
	}

	submit() {
		this.formSubmitAttempt.emit(this.isLastStep);
	}

	get isLastStep(): boolean {
		return this.currentStep === this.steps.length - 1;
	}
}
