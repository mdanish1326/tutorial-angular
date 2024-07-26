import { Component, Input, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SideNavigationComponent } from '../side-navigation/side-navigation.component';
import { SidenavService } from '../../services/sidenav.service';
import { Event, NavigationEnd, Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { SearchService } from '../../services/search.service';
import { filter } from 'rxjs';


interface DialogData {
  title: string,
  subtitle: string,
  cancelBtn: string,
  confirmBtn: string,
  func: () => void,
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatInput,
    MatLabel,
    MatFormField,
    SideNavigationComponent,
    RouterLink
  ],
  providers: [
    LocalStorageService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  localStorageService = inject(LocalStorageService);
  authService = inject(AuthService);
  searchService = inject(SearchService);

  @ViewChild('modalBody') modalBody!: TemplateRef<HTMLElement>;
  @Input() title: string = 'Header Title';
  modalSubtitle: string = 'Subtitle';
  searchText = '';
  showSearch = this.router.url === '/';

  constructor(
    private sidenavService: SidenavService,
    private dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.updateSearchVisibility(this.router.url);
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateSearchVisibility(event.url);
    });
  }

  private updateSearchVisibility(url: string): void {
    this.showSearch = url === '/';
  }


  onSearchTermChange() {
    this.searchService.changeSearchTerm(this.searchText);
  }

  onSearchClear() {
    this.searchText = '';
    this.onSearchTermChange();
  }

  toggleSidenav() {
    this.sidenavService.toggleSidenav();
  }

  confirmationDialog({ title, subtitle, cancelBtn, confirmBtn, func }: DialogData) {
    this.modalSubtitle = subtitle;
    const dialogRef = this.dialog.open(GenericModalComponent, {
      panelClass: 'dialog-container',
      data: {
        title: title,
        confirmButtonText: confirmBtn,
        cancelButtonText: cancelBtn,
        contentTemplate: this.modalBody,
        disabledConfirmBtn: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        func.bind(this)();
      } else {
        console.log(`${title} declined`);
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  deleteAccount() {
    this.authService.deleteAccount();
  }
}
