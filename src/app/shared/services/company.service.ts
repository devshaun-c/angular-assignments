import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import {
	BehaviorSubject,
	Observable,
	catchError,
	concatMap,
	delay,
	from,
	interval,
	map,
	of,
} from "rxjs";
import { ICompany, ICompanyResponse } from "src/interface/interface";

@Injectable({
	providedIn: "root",
})
export class CompanyService {
	constructor(private http: HttpClient) {}

	public loadData(
		page: number = 1,
		itemsPerPage: number = 5,
		isError: boolean = false
	): Observable<ICompanyResponse> {
		return this.http
			.get<ICompany[]>(`./assets/data/${isError ? "error" : "companies.json"}`)
			.pipe(
				delay(1000), // to simulate waiting for an actual backend response
				map((items) => ({
					metadata: {
						itemsPerPage: itemsPerPage,
						page: page,
						totalItems: items.length,
					},
					data: items.slice((page - 1) * itemsPerPage, page * itemsPerPage),
				})),
				catchError((error) => {
					throw new Error("Data can't be received");
				})
			);
	}
}
