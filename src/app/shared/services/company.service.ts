import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, delay, map } from "rxjs";
import { ICompany, ICompanyResponse, IFilter } from "src/interface/interface";
import { hasIntersection } from "../utils/utils";

@Injectable({
	providedIn: "root",
})
export class CompanyService {
	constructor(private http: HttpClient) {}

	public loadData(
		page: number,
		pageSize: number,
		filterQuery: IFilter
	): Observable<ICompanyResponse> {
		return this.http.get<ICompany[]>("./assets/data/companies.json").pipe(
			delay(1000), // to simulate waiting for an actual backend response
			map((items) => {
				let metadata = {
					pageSize: pageSize,
					page: page,
					totalItems: items.length,
				};
				let filteredList = [...items];
				const { searchValue, productList, statusList, startDate, endDate } = filterQuery;

				// FILTER FOR DATE
				if (startDate && endDate) {
					filteredList = filteredList.filter((c) => {
						return (
							(!startDate || new Date(c.dateJoined) >= startDate) &&
							(!endDate || new Date(c.dateJoined) <= endDate)
						);
					});
				}

				// FILTER FOR STATUS
				if (statusList.length) {
					filteredList = filteredList.filter((c) =>
						hasIntersection([c.status], statusList)
					);
				}

				// FILTER FOR PRODUCT
				if (productList.length) {
					filteredList = filteredList.filter((c) =>
						hasIntersection(
							c.products.map((p) => p.id),
							productList
						)
					);
				}

				// FILTER FOR SEARCH
				if (searchValue) {
					const lowerCaseSearchQuery = searchValue.toLowerCase();
					filteredList = filteredList.filter(
						(c) =>
							c.companyName.toLowerCase().includes(lowerCaseSearchQuery) ||
							c.companyRepName.toLowerCase().includes(lowerCaseSearchQuery)
					);
				}

				// If current pagination is larger than the actual list, default the page to 1
				const numberOfDisplayablePages = Math.ceil(filteredList.length / pageSize);
				metadata.page = metadata.page > numberOfDisplayablePages ? 1 : page;

				return {
					metadata: {
						...metadata,
						totalItems: filteredList.length,
					},
					data: filteredList.slice(
						(metadata.page - 1) * metadata.pageSize,
						metadata.page * metadata.pageSize
					),
				};
			}),
			catchError((error) => {
				throw new Error("Failed to fetch data");
			})
		);
	}
}
