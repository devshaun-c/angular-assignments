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
import { MatDatepickerInputEvent, MatDatepickerModule } from "@angular/material/datepicker";
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
import {
	ICompany,
	ICompanyResponse,
	IFilter,
	IPaginationMetadata,
	IProduct,
} from "src/interface/interface";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatNativeDateModule } from "@angular/material/core";

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
		MatDatepickerModule,
		MatNativeDateModule,
		MatInputModule,
		HeaderComponent,
		CommonModule,
		StatusTagComponent,
		FormsModule,
	],
})
export class ListingPageComponent implements OnInit {
	public isLoading: boolean = true;
	public isRefresh: boolean = true;
	public isError: boolean = false;
	public productList: IProduct[] = PRODUCT_OPTIONS;
	public statusList: string[] = STATUS_OPTIONS;
	public filterProperties: IFilter = {
		searchValue: "",
		statusList: [],
		productList: [],
		startDate: null,
		endDate: null,
	};
	public paginationProperties: IPaginationMetadata = {
		page: 1,
		pageSize: 5,
		totalItems: 0,
	};

	public listingData$: Observable<any>;
	public filterQuery$ = new BehaviorSubject<IFilter>(this.filterProperties);
	public pagination$ = new BehaviorSubject<{
		page: number;
		pageSize: number;
		totalItems: number;
	}>(this.paginationProperties);

	// TABLE COLUNS
	displayedColumns: string[] = [
		"id",
		"dateJoined",
		"companyName",
		"companyRepName",
		"products",
		"status",
	];

	constructor(
		private companyService: CompanyService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.resumeFilterQueryParams();
	}

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
				this.isLoading = false;
				this.isRefresh = false;
			}),
			catchError((error) => {
				this.isError = true;
				this.isLoading = false;
				throw new Error("Failed to fetch data");
			})
		);
	}

	handleSearchChange(searchQuery: string) {
		const { statusList, productList, startDate, endDate } = this.filterProperties;
		this.filterProperties.searchValue = searchQuery;
		this.filterQuery$.next({
			searchValue: searchQuery,
			statusList,
			productList,
			startDate,
			endDate,
		});

		this.applyFilterToRoute();
	}

	handleFilterChange(options: string[], category: string) {
		const { searchValue, statusList, productList, startDate, endDate } = this.filterProperties;

		if (category === "products") {
			this.filterProperties.productList = options;

			this.filterQuery$.next({
				searchValue,
				statusList,
				productList: options,
				startDate,
				endDate,
			});
		}

		if (category === "status") {
			this.filterProperties.statusList = options;

			this.filterQuery$.next({
				searchValue,
				statusList: options,
				productList,
				startDate,
				endDate,
			});
		}

		this.applyFilterToRoute();
	}

	handleDateFilterChange(type: string, event: MatDatepickerInputEvent<Date>) {
		if (type === "start") this.filterProperties.startDate = event.value;
		if (type === "end") this.filterProperties.endDate = event.value;

		const { searchValue, statusList, productList, startDate, endDate } = this.filterProperties;

		if (startDate && endDate) {
			this.filterQuery$.next({
				searchValue,
				statusList,
				productList,
				startDate,
				endDate,
			});
		}

		this.applyFilterToRoute();
	}

	handleClearSearch() {
		const { statusList, productList, startDate, endDate } = this.filterProperties;
		this.isLoading = true;
		this.filterProperties.searchValue = "";
		this.filterQuery$.next({
			searchValue: "",
			productList,
			statusList,
			startDate,
			endDate,
		});

		this.resetPagination();
		this.router.navigate([]);
	}

	handleClearAllFilters() {
		this.isLoading = true;
		this.resetAllFilterQuery();
	}

	handleRefreshData() {
		this.isError = false;
		this.isRefresh = true;

		this.resetAllFilterQuery();
		this.resetPagination();
	}

	handleSimulateError() {
		this.isError = true;
	}

	handlePageEvent(e: PageEvent) {
		this.paginationProperties = {
			page: e.pageIndex + 1,
			pageSize: e.pageSize,
			totalItems: this.paginationProperties.totalItems,
		};

		this.pagination$.next({
			page: e.pageIndex + 1,
			pageSize: e.pageSize,
			totalItems: this.paginationProperties.totalItems,
		});

		this.applyFilterToRoute();
	}

	private resetAllFilterQuery() {
		this.filterProperties = {
			searchValue: "",
			statusList: [],
			productList: [],
			startDate: null,
			endDate: null,
		};
		this.filterQuery$.next(this.filterProperties);

		this.resetPagination();
		this.router.navigate([]);
	}

	private resetPagination() {
		this.paginationProperties = {
			page: 1,
			pageSize: 5,
			totalItems: 0,
		};

		this.pagination$.next({
			page: 1,
			pageSize: 5,
			totalItems: this.paginationProperties.totalItems,
		});
	}

	private applyFilterToRoute(): void {
		const { searchValue, productList, statusList, startDate, endDate } = this.filterProperties;
		const { pageSize, page } = this.paginationProperties;

		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: {
				search: searchValue ? searchValue : null,
				products: productList.length ? productList : [],
				status: statusList.length ? statusList : [],
				startDate: startDate,
				endDate: endDate,
				page: page,
				pageSize: pageSize,
			},
			replaceUrl: true,
		});
	}

	private resumeFilterQueryParams() {
		let queryParams = this.activatedRoute.snapshot.queryParamMap;

		if (queryParams.get("page")) {
			this.paginationProperties.page = parseInt(queryParams.get("page") || "1");
		}
		if (queryParams.get("pageSize")) {
			this.paginationProperties.pageSize = parseInt(queryParams.get("pageSize") || "5");
		}
		if (queryParams.get("search")) {
			this.filterProperties.searchValue = queryParams.get("search") || "";
		}
		if (queryParams.getAll("status")) {
			this.filterProperties.statusList = queryParams.getAll("status");
		}
		if (queryParams.getAll("products")) {
			this.filterProperties.productList = queryParams.getAll("products");
		}
		if (queryParams.get("startDate")) {
			this.filterProperties.startDate = new Date(queryParams.get("startDate") || null || 0);
		}
		if (queryParams.get("endDate")) {
			this.filterProperties.endDate = new Date(queryParams.get("endDate") || null || 0);
		}
	}
}
