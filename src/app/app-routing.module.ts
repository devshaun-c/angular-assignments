import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListingPageComponent } from "./modules/listing-page/listing-page.component";
import { DefaultLayoutComponent } from "./shared/layout/default-layout/default-layout.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./modules/home/home.component";
import { CreatePageComponent } from "./modules/create-page/create-page.component";

const routes: Routes = [
	{
		path: "",
		component: DefaultLayoutComponent,
		children: [{ path: "", component: HomeComponent }],
	},
	{
		path: "listing",
		component: DefaultLayoutComponent,
		children: [{ path: "", component: ListingPageComponent }],
	},
	{
		path: "create",
		component: DefaultLayoutComponent,
		children: [{ path: "", component: CreatePageComponent }],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
