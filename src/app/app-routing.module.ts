import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { TemaComponent } from 'src/app/components/tema/tema.component';
import { DetalleComponent } from 'src/app/components/detalle/detalle.component';
import { PanelTemaComponent } from 'src/app/components/panel-tema/panel-tema.component';
import { ExperimentoComponent } from 'src/app/components/experimento/experimento.component';


import { RegistroComponent } from './components/user/registro/registro.component';
import { LoginComponent } from './components/user/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { LogoutGuard } from './guards/logout.guard';



const routes: Routes = [
  {
    path: '', component: InicioComponent,
    canActivate: [LogoutGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'detalle/:id',
    component: DetalleComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'tema/:id',
    component: TemaComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'panelTema/:id',
    component: PanelTemaComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'experimento/:id',
    component: ExperimentoComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'user/registro',
    component: RegistroComponent,
    canActivate: [LogoutGuard]
  },
  {
    path: 'user/login', component: LoginComponent,
    canActivate: [LogoutGuard]

  },
  
  //{ path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
