import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Factura } from '../clases/factura';
import { FacturasService } from '../services/facturas.service';
import * as moment from 'moment';

@Component({
  selector: 'app-fac-detail',
  templateUrl: './fac-detail.component.html',
  styleUrls: ['./fac-detail.component.css']
})
export class FacDetailComponent implements OnInit {

  paramId: number;
  factura = new Factura;
  updated: boolean;
  created: boolean;
  error: boolean;
  igv_porcentaje: number;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private facturaService: FacturasService) {
    this.created = false;
    this.updated = false;
    this.error = false;
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.paramId = params['id'];
        this.facturaService.getById(this.paramId).subscribe((result) => {
          this.igv_porcentaje = Number(result.igv) * 100;
          result.fecha_emision = moment(this.factura.fecha_emision).format('YYYY-MM-DD');
          result.fecha_impresion = moment(this.factura.fecha_impresion).format('YYYY-MM-DD');
          result.fecha_vencimiento = moment(this.factura.fecha_vencimiento).format('YYYY-MM-DD');
          this.factura = result;
        })
      } else {
        this.paramId = undefined;
      }
    })
  }

  ngOnInit() {
  }

  update(): void {
    this.factura.igv = Number(this.igv_porcentaje) / 100;
    this.factura.precio_venta = Number(this.factura.valor_venta) * (1 + Number(this.factura.igv));
    this.factura.tipo_pago = 'Credito';
    this.facturaService.update(this.factura).subscribe((result) => {
      console.log(result);
      this.updated = true;
      setTimeout(() => {
        this.updated = false;
      }, 3000);
    }, (error) => {
      console.log(error);
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 3000);
    })
  }

  create(): void {
    this.factura.igv = Number(this.igv_porcentaje) / 100;
    this.factura.precio_venta = Number(this.factura.valor_venta) * (1 + Number(this.factura.igv));
    this.facturaService.save(this.factura).subscribe((result) => {
      this.created = true;
      setTimeout(() => {
        this.created = false;
        this._router.navigate(['facturas/'+result.id])
      }, 3000);
    }, (error) => {
      console.log(error);
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 3000);
    })
  }

  back(): void {
    this._router.navigate(["facturas"]);
  }

  desc(): void {
    this._router.navigate(["descuento/" + this.paramId]);
  }
}
