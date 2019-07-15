import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import { IMaskModule } from 'angular-imask';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ReservaComponent } from './reserva/reserva.component';
import { DoacaoComponent } from './doacao/doacao.component';
import { AdocaoComponent } from './adocao/adocao.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LojaComponent } from './loja/loja.component';
import { PopUpAdocao } from './adocao/PopUpAdocao';
import { PopUpDetalhes } from './adocao/PopUpDetalhes';
import { PopUpAvisoAdocao } from './adocao/PopUpAvisoAdocao';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    AboutComponent,
    ReservaComponent,
    DoacaoComponent,
    AdocaoComponent,
    PopUpAdocao,
    PopUpDetalhes,
    PopUpAvisoAdocao,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    PerfilComponent,
    LojaComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    IMaskModule,
    MatButtonModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [AdocaoComponent, PopUpAdocao, PopUpDetalhes, PopUpAvisoAdocao],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
