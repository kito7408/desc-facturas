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

  constructor(
    private _router: Router,
    private userService: UsuariosService
    ) { }

  ngOnInit() {
  }

  getAll(): void {
    this.userService.getAll()
    .subscribe(data => console.log(data));
  }

  registrar(): void {
    this._router.navigate(['registro']);
  }
}
