import { Component } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { HomeComponent } from '../../Components/home/home.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../Components/footer/footer.component';
import { SideNavigationComponent } from '../../Components/side-navigation/side-navigation.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    SideNavigationComponent,
    HomeComponent,
    FooterComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
