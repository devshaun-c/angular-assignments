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
	@Input() isLoading: boolean = false;
	@Input() currentStep: number;
}
