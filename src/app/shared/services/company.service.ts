import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, delay, map } from "rxjs";
import { ICompany, ICompanyResponse } from "src/interface/interface";
import { MatTableDataSource } from "@angular/material/table";

@Injectable({
	providedIn: "root",
})
export class CompanyService {
	constructor(private http: HttpClient) {}

	public loadData(
		page: number = 1,
		pageSize: number = 5,
		isError: boolean = false
	): Observable<any> {
		return this.http
			.get<ICompany[]>(`./assets/data/${isError ? "error" : "companies.json"}`)
			.pipe(
				delay(1000), // to simulate waiting for an actual backend response
				map((items) => ({
					metadata: {
						pageSize: pageSize,
						page: page,
						totalItems: items.length,
					},
					data: items.slice((page - 1) * pageSize, page * pageSize),
				})),
				catchError((error) => {
					throw new Error("Failed to fetch data");
				})
			);
	}
}
