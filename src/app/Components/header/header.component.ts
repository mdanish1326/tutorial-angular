import { Component, Input, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SideNavigationComponent } from '../side-navigation/side-navigation.component';
import { SidenavService } from '../../services/sidenav.service';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


interface DialogData {
  title: string,
  subtitle: string
  cancelBtn: string,
  confirmBtn: string,
  func: () => void,
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
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
export class HeaderComponent {

  localStorageService = inject(LocalStorageService);
  authService = inject(AuthService);

  @ViewChild('modalBody') modalBody!: TemplateRef<HTMLElement>;
  @Input() title: string = 'Header Title';
  modalSubtitle: string = 'Subtitle';

  constructor(
    private sidenavService: SidenavService,
    private dialog: MatDialog,
    public router: Router,
  ) { }

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
    this.localStorageService.remove('isAuthenticated');
    this.router.navigate(['/login']);
  }

  deleteAccount() {
    this.localStorageService.remove('user');
    this.router.navigate(['/signup']);
  }
}
