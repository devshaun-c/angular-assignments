import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
	selector: "app-step-1-form",
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
	],
	templateUrl: "./step-1-form.component.html",
	styleUrls: ["./step-1-form.component.scss"],
})
export class Step1FormComponent {
	@Input() formGroup!: FormGroup;
}
