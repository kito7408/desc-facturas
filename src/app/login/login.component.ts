import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios/usuarios';
import { UsuariosService } from '../services/usuarios.service';
import { Router, ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string;
  pass: string;

  constructor(
    private _router: Router,
    private userService: UsuariosService
    ) { }

  ngOnInit() {
  }

  login(): void {
    this.userService.login(this.user, this.pass)
    .subscribe((data: Usuario) => {
      console.log(data);
      localStorage.setItem('userID', data.id + '');
      this._router.navigate(['facturas']);
    }, (error) => {
      console.log("no existe el usuario");
    });
  }

  registrar(): void {
    this._router.navigate(['registro']);
  }
}
