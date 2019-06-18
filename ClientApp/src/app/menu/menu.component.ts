import { Component, OnInit, ChangeDetectorRef, OnDestroy, OnChanges } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../authentication.service';
import { PerfilComponent } from '../perfil/perfil.component';
import { PatinhasService } from '../patinhas.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public appTitle = 'Patinhas que brilham';
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialog: MatDialog,
    public patinhas: PatinhasService,
    public authentication: AuthenticationService
  ) {
    this.mobileQuery = media.matchMedia('max-width: 600px');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    if (this.patinhas.currentUserValue()) {
      this.authentication.logged = true;
    }
  }

  public openDialogLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: 'auto',
      height: 'auto'
    });
  }

  public openDialogPerfil(): void {
    const dialogRef = this.dialog.open(PerfilComponent, {
      width: 'auto',
      height: 'auto'
    });
  }

  public logout(): void {
    this.patinhas.logout();
  }
}
