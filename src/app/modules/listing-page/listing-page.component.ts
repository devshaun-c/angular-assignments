import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { PRODUCT_OPTIONS, STATUS_OPTIONS } from "src/constants/options";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { StatusTagComponent } from "src/app/shared/components/status-tag/status-tag.component";
import { CompanyService } from "src/app/shared/services/company.service";
import { Observable, finalize, map, tap } from "rxjs";
import { ICompany } from "src/interface/interface";

@Component({
	selector: "app-listing-page",
	templateUrl: "./listing-page.component.html",
	styleUrls: ["./listing-page.component.scss"],
	standalone: true,
	imports: [
		MatTableModule,
		MatButtonModule,
		MatSelectModule,
		MatFormFieldModule,
		MatIconModule,
		MatPaginatorModule,
		MatInputModule,
		HeaderComponent,
		CommonModule,
		StatusTagComponent,
	],
})
export class ListingPageComponent implements OnInit {
	public page: number = 1;
	public itemsPerPage: number = 5;
	public totalItems: number = 0;
	public data: ICompany[] = [];
	public isLoading: boolean = true;
	public isError: boolean = false;

	displayedColumns: string[] = [
		"id",
		"dateJoined",
		"companyName",
		"companyRepName",
		"products",
		"status",
	];
	productList = PRODUCT_OPTIONS;
	statusList = STATUS_OPTIONS;

	constructor(private companyService: CompanyService) {}

	ngOnInit(): void {
		this.getData();
	}

	private getData() {
		this.companyService.loadData(this.page, this.itemsPerPage, this.isError).subscribe({
			next: (response) => {
				this.isLoading = false;
				this.data = response.data;
				this.totalItems = response.metadata.totalItems;
				console.log(this.data);
			},
			error: (error) => {
				console.log(error);
				this.isLoading = false;
			},
		});
	}

	handleClearSearch() {
		console.log("CLEAR SEARCH");
	}

	handleRefreshData() {
		console.log("REFRESH DATA and FILTERS");
		this.isLoading = true;
		this.isError = false;
		this.page = 1;
		this.itemsPerPage = 5;
		this.getData();
	}

	handleSimulateError() {
		console.log("SIMULATE ERROR");
		this.isLoading = true;
		this.isError = true;
		this.data = [];
		this.getData();
	}
}
