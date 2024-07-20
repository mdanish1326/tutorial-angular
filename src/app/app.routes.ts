import { Routes } from '@angular/router';
import { LayoutComponent } from './Pages/layout/layout.component';
import { HomeComponent } from './Components/home/home.component';
import { AddProductComponent } from './Components/add-product/add-product.component';

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				component: HomeComponent
			},
			{
				title: "Add Product",
				path: 'add-product',
				component: AddProductComponent,
				data: { title: "Add Product"}
			}
		]
	},
	{
		path: '**',
		redirectTo: ''
	},
];
