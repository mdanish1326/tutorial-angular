import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from '../../services/sidenav.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatIcon,
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButton,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss'
})
export class SideNavigationComponent implements OnInit {

  authService = inject(AuthService);
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @Input() isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(private sidenavService: SidenavService, public router: Router) { }

  ngOnInit() {
    this.sidenavService.sidenavToggle$.subscribe(() => this.sidenav.toggle());
    if (this.authService.isAuthenticated()) {
      this.isExpanded = true;
    }
  }

  mouseenter() {
    console.log("mouseenter", this.isExpanded, this.isShowing);
    // if (!this.isExpanded) {
    //   this.isShowing = true;
    // }
  }

  mouseleave() {
    console.log("mouse leave", this.isExpanded, this.isShowing);
    // if (!this.isExpanded) {
    //   this.isShowing = false;
    // }
  }
}
