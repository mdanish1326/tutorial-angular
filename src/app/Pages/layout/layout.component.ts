import { Component } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { HomeComponent } from '../../Components/home/home.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, HomeComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  
}
