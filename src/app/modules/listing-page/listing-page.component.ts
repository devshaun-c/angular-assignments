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
import {
	BehaviorSubject,
	Observable,
	Subject,
	catchError,
	combineLatest,
	debounceTime,
	switchMap,
	takeUntil,
	tap,
} from "rxjs";
import { ICompany, ICompanyResponse, IFilter, IProduct } from "src/interface/interface";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormsModule } from "@angular/forms";

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
		FormsModule,
	],
})
export class ListingPageComponent implements OnInit {
	public totalItems: number = 0;
	public isLoading: boolean = true;
	public isRefresh: boolean = true;
	public isError: boolean = false;
	public productList: IProduct[] = PRODUCT_OPTIONS;
	public statusList: string[] = STATUS_OPTIONS;
	public filterProperties: IFilter = {
		searchValue: "",
		statusList: [],
		productList: [],
	};

	public listingData$: Observable<any>;
	private unsubscribe$ = new Subject<void>();
	public filterQuery$ = new BehaviorSubject<IFilter>(this.filterProperties);

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

	constructor(private companyService: CompanyService) {}

	ngOnInit(): void {
		this.listingData$ = combineLatest([
			this.pagination$,
			this.filterQuery$.pipe(debounceTime(500)),
		]).pipe(
			tap(() => (this.isLoading = true)),
			switchMap(([pagination, filterQuery]) =>
				this.companyService.loadData(pagination.page, pagination.pageSize, filterQuery)
			),
			tap((res) => {
				this.totalItems = res.metadata.totalItems;
				this.isLoading = false;
				this.isRefresh = false;
			}),
			takeUntil(this.unsubscribe$),
			catchError((error) => {
				this.isError = true;
				this.isLoading = false;
				throw new Error("Failed to fetch data");
			})
		);
	}

	handleSearchChange(searchQuery: string) {
		this.filterProperties.searchValue = searchQuery;
		this.filterQuery$.next({
			searchValue: searchQuery,
			statusList: this.filterProperties.statusList,
			productList: this.filterProperties.productList,
		});
	}

	handleFilterChange(options: string[], category: string) {
		if (category === "products") {
			this.filterProperties.productList = options;

			this.filterQuery$.next({
				searchValue: this.filterProperties.searchValue,
				statusList: this.filterProperties.statusList,
				productList: options,
			});
		}

		if (category === "status") {
			this.filterProperties.statusList = options;

			this.filterQuery$.next({
				searchValue: this.filterProperties.searchValue,
				statusList: options,
				productList: this.filterProperties.productList,
			});
		}
	}

	handleClearSearch() {
		console.log("CLEAR SEARCH");
		this.isLoading = true;
		this.filterProperties.searchValue = "";
		this.resetFilterQuery();
	}

	handleClearAllFilters() {
		this.isLoading = true;
		this.resetFilterQuery();
	}

	handleRefreshData() {
		console.log("REFRESH DATA and FILTERS");
		this.isError = false;
		this.isRefresh = true;

		this.resetFilterQuery();
		this.resetPagination();
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

	private resetFilterQuery() {
		this.filterProperties = { searchValue: "", statusList: [], productList: [] };
		this.filterQuery$.next({
			searchValue: "",
			productList: [],
			statusList: [],
		});
	}

	private resetPagination() {
		this.pagination$.next({
			page: 1,
			pageSize: 5,
			totalItems: this.totalItems,
		});
	}
}
