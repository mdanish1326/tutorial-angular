import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from '../../services/sidenav.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss'
})
export class SideNavigationComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @Input() isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
    this.sidenavService.sidenavToggle$.subscribe(() => this.sidenav.toggle());
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
