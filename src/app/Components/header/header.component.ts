import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SideNavigationComponent } from '../side-navigation/side-navigation.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    SideNavigationComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() title: string = 'Header Title';

  toggleSidenav() { 
    console.log('toggle side nav');
  }
}
