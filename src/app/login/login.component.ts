import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/usuarios';
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
  error: boolean;

  constructor(
    private _router: Router,
    private userService: UsuariosService
    ) { }

  ngOnInit() {
  }

  login(): void {
    this.userService.login(this.user, this.pass)
    .subscribe((data: any) => {
      localStorage.setItem('user', JSON.stringify(data.data));
      this._router.navigate(['facturas']);
    }, (error) => {
      console.log("no existe el usuario");
      console.log(error);
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 3000);
    });
  }

  registrar(): void {
    this._router.navigate(['registro']);
  }
}
