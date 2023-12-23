import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-status-tag",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./status-tag.component.html",
	styleUrls: ["./status-tag.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusTagComponent {
	@Input() status: string;

	getStatusColor() {
		return this.status.toLowerCase();
	}
}
