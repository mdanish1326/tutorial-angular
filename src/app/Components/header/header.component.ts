import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SideNavigationComponent } from '../side-navigation/side-navigation.component';
import { SidenavService } from '../../services/sidenav.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    SideNavigationComponent,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() title: string = 'Header Title';

  constructor(private sidenavService: SidenavService) { }

  toggleSidenav() {
    this.sidenavService.toggleSidenav();
  }
}
