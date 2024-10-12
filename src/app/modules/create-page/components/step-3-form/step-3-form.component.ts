import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { PRODUCT_OPTIONS } from "src/constants/options";
import { ICompany, IProduct } from "src/interface/interface";

@Component({
	selector: "app-step-3-form",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./step-3-form.component.html",
	styleUrls: ["./step-3-form.component.scss"],
})
export class Step3FormComponent {
	@Input() data: ICompany;
	productList: IProduct[] = PRODUCT_OPTIONS;

	mapProductIdsToNames(products: IProduct[]): string {
		return products
			.map(
				(product) =>
					this.productList.find((item) => item.id === product.id)
						?.name
			)
			.join(", ");
	}
}
