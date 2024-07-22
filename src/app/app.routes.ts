import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/main-layout/layout.component';
import { HomeComponent } from './Components/home/home.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './Components/login/login.component';

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
				data: { title: "Add Product" }
			},
			{
				path: 'profile',
				component: ProfileComponent,
				canActivate: [AuthGuard]
			}
		]
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: '**',
		redirectTo: ''
	},
];
