import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
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
import { BehaviorSubject, Observable, Subject, catchError, switchMap, tap } from "rxjs";
import { ICompany, ICompanyResponse, IProduct } from "src/interface/interface";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

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
		MatProgressSpinnerModule,
		MatInputModule,
		HeaderComponent,
		CommonModule,
		StatusTagComponent,
	],
})
export class ListingPageComponent implements OnInit {
	public totalItems: number = 0;
	public isLoading: boolean = true;
	public isRefresh: boolean = true;
	public isError: boolean = false;

	public unsubscribe$ = new Subject<void>();
	public listingData$: Observable<any>;
	public pagination$ = new BehaviorSubject<{
		page: number;
		pageSize: number;
		totalItems: number;
	}>({ page: 1, pageSize: 5, totalItems: 0 });

	displayedColumns: string[] = [
		"id",
		"dateJoined",
		"companyName",
		"companyRepName",
		"products",
		"status",
	];
	productList: IProduct[] = PRODUCT_OPTIONS;
	statusList: string[] = STATUS_OPTIONS;

	constructor(private companyService: CompanyService) {}

	ngOnInit(): void {
		this.listingData$ = this.pagination$.pipe(
			tap(() => (this.isLoading = true)),
			switchMap((res) => this.companyService.loadData(res.page, res.pageSize, this.isError)),
			tap((res) => {
				this.totalItems = res.metadata.totalItems;
				this.isLoading = false;
				this.isRefresh = false;
			}),
			catchError((error) => {
				this.isLoading = false;
				throw new Error("Failed to fetch data");
			})
		);
	}

	handleClearSearch() {
		console.log("CLEAR SEARCH");
	}

	handleRefreshData() {
		console.log("REFRESH DATA and FILTERS");
		this.isError = false;
		this.isRefresh = true;

		this.pagination$.next({
			page: 1,
			pageSize: 5,
			totalItems: this.totalItems,
		});
	}

	handleSimulateError() {
		console.log("SIMULATE ERROR");
		this.isError = true;
	}

	handlePageEvent(e: PageEvent) {
		this.pagination$.next({
			page: e.pageIndex + 1,
			pageSize: e.pageSize,
			totalItems: this.totalItems,
		});
	}
}
