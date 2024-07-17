import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [
    MatSidenav
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss'
})
export class SideNavigationComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
