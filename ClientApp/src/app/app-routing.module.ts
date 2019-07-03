import { AdministracaoComponent } from './administracao/administracao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DoacaoComponent } from './doacao/doacao.component';
import { ReservaComponent } from './reserva/reserva.component';
import { AdocaoComponent } from './adocao/adocao.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LojaComponent } from './loja/loja.component';
import { GerenciarAdocaoComponent } from './administracao/gerenciar-adocao/gerenciar-adocao.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'doacao', component: DoacaoComponent },
  { path: 'reserva', component: ReservaComponent },
  { path: 'adocao', component: AdocaoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'loja', component: LojaComponent },
  { path: 'administracao', component: AdministracaoComponent },
  { path: 'gerenciarAdocao', component: GerenciarAdocaoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
