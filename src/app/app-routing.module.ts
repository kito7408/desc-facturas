import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BancosComponent } from './bancos/bancos.component';
import { DeudoresComponent } from './deudores/deudores.component';
import { FacturasComponent } from './facturas/facturas.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegistroComponent } from './registro/registro.component';
import { FacDetailComponent } from './fac-detail/fac-detail.component';
import { CalcDescuentoComponent } from './calc-descuento/calc-descuento.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'bancos', component: BancosComponent },
  { path: 'deudores', component: DeudoresComponent },
  { path: 'facturas', component: FacturasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'facturas/new', component: FacDetailComponent},
  { path: 'facturas/:id', component: FacDetailComponent},
  { path: 'descuento/:id', component: CalcDescuentoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
