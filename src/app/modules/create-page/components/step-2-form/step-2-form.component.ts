import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { IProduct } from "src/interface/interface";
import { PRODUCT_OPTIONS } from "src/constants/options";

@Component({
	selector: "app-step-2-form",
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
	],
	templateUrl: "./step-2-form.component.html",
	styleUrls: ["./step-2-form.component.scss"],
})
export class Step2FormComponent {
	@Input() formGroup!: FormGroup;
	@Input() isLoading: boolean = false;
	productList: IProduct[] = PRODUCT_OPTIONS;
}
