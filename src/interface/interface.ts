export interface ICompany {
	id: number;
	dateJoined: Date;
	companyName: string;
	companyAddress: string;
	companyId: string;
	companyRepName: string;
	email: string;
	description: string;
	products: IProduct[];
	status: "Active" | "Pending" | "Cancelled";
}

export interface IProduct {
	id: string;
	name: string;
}

export interface IPaginationMetadata {
	pageSize: number;
	page: number;
	totalItems: number;
}

export interface ICompanyResponse {
	metadata: IPaginationMetadata;
	data: ICompany[];
}

export interface IFilter {
	searchValue: string;
	statusList: string[];
	productList: string[];
	startDate: Date | null;
	endDate: Date | null;
}
