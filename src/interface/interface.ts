export interface ICompany {
	id: number;
	dateJoined: Date;
	companyName: string;
	companyId: string;
	companyRepName: string;
	products: IProduct[];
	status: "Active" | "Pending" | "Cancelled";
}

export interface IProduct {
	id: string;
	name: string;
}

export interface IPaginationMetadata {
	itemsPerPage: number;
	page: number;
	totalItems: number;
}

export interface ICompanyResponse {
	metadata: IPaginationMetadata;
	data: ICompany[];
}
