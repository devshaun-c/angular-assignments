import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, delay, map } from "rxjs";
import { ICompany, ICompanyResponse, IFilter } from "src/interface/interface";
import { MatTableDataSource } from "@angular/material/table";
import { hasIntersection } from "../utils/utils";

@Injectable({
	providedIn: "root",
})
export class CompanyService {
	constructor(private http: HttpClient) {}

	// id: number;
	// dateJoined: Date;
	// companyName: string;
	// companyId: string;
	// companyRepName: string;
	// products: IProduct[];
	// status: "Active" | "Pending" | "Cancelled";

	public loadData(page: number = 1, pageSize: number = 5, filterQuery: IFilter): Observable<any> {
		return this.http.get<ICompany[]>("./assets/data/companies.json").pipe(
			delay(1000), // to simulate waiting for an actual backend response
			map((items) => {
				let metadata = {
					pageSize: pageSize,
					page: page,
					totalItems: items.length,
				};
				let filteredList = [...items];

				// FILTER FOR STATUS
				if (filterQuery.statusList.length) {
					filteredList = filteredList.filter((c) =>
						hasIntersection([c.status], filterQuery.statusList)
					);
					metadata = {
						...metadata,
						totalItems: filteredList.length,
					};
				}

				// FILTER FOR PRODUCT
				if (filterQuery.productList.length) {
					filteredList = filteredList.filter((c) =>
						hasIntersection(
							c.products.map((p) => p.id),
							filterQuery.productList
						)
					);
					metadata = {
						...metadata,
						totalItems: filteredList.length,
					};
				}

				// FILTER FOR SEARCH
				if (filterQuery.searchValue) {
					const lowerCaseSearchQuery = filterQuery.searchValue.toLowerCase();
					filteredList = filteredList.filter(
						(c) =>
							c.companyName.toLowerCase().includes(lowerCaseSearchQuery) ||
							c.companyRepName.toLowerCase().includes(lowerCaseSearchQuery)
					);
					metadata = {
						...metadata,
						totalItems: filteredList.length,
					};
				}

				return {
					metadata,
					data: filteredList.slice((page - 1) * pageSize, page * pageSize),
				};
			}),
			catchError((error) => {
				throw new Error("Failed to fetch data");
			})
		);
	}
}
