import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListingPageComponent } from "./modules/listing-page/listing-page.component";
import { DefaultLayoutComponent } from "./shared/layout/default-layout/default-layout.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./modules/home/home.component";

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
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
