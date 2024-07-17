import { Routes } from '@angular/router';
import { LayoutComponent } from './Pages/layout/layout.component';
import { HomeComponent } from './Components/home/home.component';

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				component: HomeComponent
			}
		]
	},
	{
		path: '**',
		redirectTo: ''
	},
];
