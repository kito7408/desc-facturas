import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginComponent } from './login/login.component';
import { FacturasComponent } from './facturas/facturas.component';
import { BancosComponent } from './bancos/bancos.component';
import { DeudoresComponent } from './deudores/deudores.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { UsuariosService } from './services/usuarios.service';
import { HttpClientModule } from '@angular/common/http';
import { FacturasService } from './services/facturas.service';
import { FacDetailComponent } from './fac-detail/fac-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    LoginComponent,
    FacturasComponent,
    BancosComponent,
    DeudoresComponent,
    RegistroComponent,
    FacDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UsuariosService, FacturasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
