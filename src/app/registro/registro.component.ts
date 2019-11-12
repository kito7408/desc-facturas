import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../usuarios/usuarios';
import { Router, ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  newUser = new Usuario;

  re_password: string;

  constructor(
    private userService: UsuariosService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  create(): void {
    if (this.newUser.password == this.re_password) {
      this.userService.save(this.newUser)
        .subscribe(data => {
          console.log(data);
          localStorage.setItem('userID', data.id.toString());
          this._router.navigate(['facturas']);
        });
    }

  }
}
