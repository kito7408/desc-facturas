import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../services/facturas.service';
import { ContratosService } from '../services/contratos.service';
import { Factura } from '../clases/factura';
import { Contrato } from '../clases/contrato';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { Usuario } from '../clases/usuarios';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  facturas: any[];
  contratos: any[];
  user: Usuario;
  cartera_vr: number;
  cartera_tcea: number;
  hayFacturas: boolean;
  hayContratos: boolean;

  constructor(
    private facturaService: FacturasService,
    private _router: Router,
    private contratoService: ContratosService
  ) {
    this.hayFacturas = false;
    this.hayContratos = false;
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this._router.navigate(["login"]);
    }
    this.cartera_vr = 0;
    this.cartera_tcea = 0;
    this.getAll();
  }

  ngOnInit() {
  }

  getAll(): void {
    this.facturaService.getByUserId(this.user.id)
    .subscribe((data) => {
      if(data.length > 0){
        this.hayFacturas = true;
      }
      data.forEach(element => {
        element.dateE_string = moment.utc(element.fecha_emision).format('DD/MM/YYYY').toString();
        element.dateV_string = moment.utc(element.fecha_vencimiento).format('DD/MM/YYYY').toString();
      });
      this.facturas=data;
    });
    var tcea_suma = 0;
    this.contratoService.getByUserId(this.user.id).subscribe((result) => {
      if(result.length > 0){
        this.hayContratos = true;
      }
      this.contratos = result;
      this.contratos.forEach(element => {
        if (element.retencion == null) {
          element.retencion = 0;
        }
        this.cartera_vr += Number(element.valor_recibido);
        element.fecha_descuento = moment.utc(element.fecha_descuento).format('DD/MM/YYYY').toString();
        element.fecha_vencimiento = moment.utc(element.fecha_vencimiento).format('DD/MM/YYYY').toString();
        element.tasa_efectiva = Number(element.tasa_efectiva) * 100;
        element.tasa_efectiva = Math.round(element.tasa_efectiva * 10000000) / 10000000;
        element.porcentaje_descuento = Number(element.porcentaje_descuento) * 100;
        element.porcentaje_descuento = Math.round(element.porcentaje_descuento * 10000000) / 10000000;
        element.tcea = Number(element.tcea) * 100;
        tcea_suma += Number(element.tcea);
        element.tcea = Math.round(element.tcea * 10000000) / 10000000;
      });
      this.cartera_tcea = tcea_suma/result.length;
      this.cartera_tcea = Math.round(this.cartera_tcea * 10000000) / 10000000;
      this.cartera_vr = Math.round(this.cartera_vr * 100) / 100;
    })
  }

  detail(id: string): void {
    this._router.navigate(['facturas/' + id]);
  }

  newFac(): void {
    this._router.navigate(['facturas/new']);
  }

  logout(): void {
    this._router.navigate(['login']);
    localStorage.clear();
  }

  goToFactura(id: number): void {
    this._router.navigate(['facturas/'+id]);
  }
}
