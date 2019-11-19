import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Factura } from '../clases/factura';
import { FacturasService } from '../services/facturas.service';
import { Banco } from '../clases/banco';
import { BancosService } from '../services/bancos.service';
import { TasasService } from '../services/tasas.service';
import { ContratosService } from '../services/contratos.service';
import * as moment from 'moment';
import { Usuario } from '../clases/usuarios';

@Component({
  selector: 'app-calc-descuento',
  templateUrl: './calc-descuento.component.html',
  styleUrls: ['./calc-descuento.component.css']
})
export class CalcDescuentoComponent implements OnInit {

  facturaID: number;
  factura = new Factura;
  bancoSeleccionado: Banco;
  bancos: Banco[];
  bancoID: number;
  tasas: any[];
  tasaID: number;
  bancoSelected: boolean;
  fecha_descuento: Date;
  created: boolean;
  error: boolean;
  user: Usuario;
  fecha_emision_string: string;
  costosIniciales = new Array<any>();
  costosFinales = new Array<any>();
  hayCostosI: boolean;
  hayCostosF: boolean;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private facturaService: FacturasService,
    private bancoService: BancosService,
    private tasaService: TasasService,
    private contratoService: ContratosService) {

    this.bancoSelected = false;
    this.created = false;
    this.error = false;
    this.hayCostosI = false;
    this.hayCostosF = false;

    this.user = JSON.parse(localStorage.getItem('user'));

    this.route.params.subscribe((params) => {
      this.facturaID = params['id'];
      this.facturaService.getById(this.facturaID).subscribe((result) => {
        this.factura = result;
        this.fecha_emision_string = moment(this.factura.fecha_emision).format('YYYY-MM-DD').toString();
        this.factura.fecha_emision = moment(this.factura.fecha_emision).format('DD/MM/YYYY').toString();
        this.factura.fecha_vencimiento = moment(this.factura.fecha_vencimiento).format('DD/MM/YYYY').toString();
      })
    });

    this.bancoService.getAll().subscribe((result) => {
      this.bancos = result;
    });
  }

  ngOnInit() {
  }

  bancoSelect(): void {
    this.bancoService.getById(this.bancoID).subscribe((result) => {
      this.bancoSeleccionado = result;
    });
    this.bancoService.costosgastos(this.bancoID).subscribe((result) => {
      this.costosIniciales = [];
      this.costosFinales = [];
      result.forEach(element => {
        if(element.estado == 0){
          this.costosIniciales.push(element);
        } else if(element.estado == 1){
          this.costosFinales.push(element);
        }
      });
      if (this.costosIniciales.length > 0 ) {
        this.hayCostosI = true;
      } else {
        this.hayCostosI = false;
      }
      if (this.costosFinales.length > 0 ) {
        this.hayCostosF = true;
      } else {
        this.hayCostosF = false;
      }
    });
    this.tasaService.getByBancoId(this.bancoID).subscribe((result) => {
      this.tasas = result;
      this.tasas.forEach(element => {
        var tasa_porcentaje = element.valor * 100;
        var tipo = '';
        if (element.tipo == 'efectiva') {
          tipo = 'E';
        } else if (element.tipo == 'nominal') {
          tipo = 'N';
        }
        var periodo = '';
        switch (element.periodo) {
          case 'mensual':
            periodo = 'M';
            break;
          case 'bimestral':
            periodo = 'B';
            break;
          case 'trimestral':
            periodo = 'T';
            break;
          case 'cuatrimestral':
            periodo = 'C';
            break;
          case 'semestral':
            periodo = 'S';
            break;
          case 'anual':
            periodo = 'A';
            break;
          default:
            break;
        }
        element.tasa_string = tasa_porcentaje + '% ' + 'T' + tipo + periodo;
      });
      this.bancoSelected = true;
    })
  }

  calculoDescuento(): void {
    this.contratoService.save(this.facturaID, this.bancoID, this.tasaID, this.fecha_descuento, this.user.id).subscribe((result) => {
      this.created = true;
      setTimeout(() => {
        this.created = false;
        this._router.navigate(['facturas']);
      }, 1500);
    }, (error) => {
      console.log(error);
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 3000);
    });
  }

  back(): void {
    this._router.navigate(['facturas/'+this.facturaID]);
  }

  log(one: any, two: any, three: any): void {
    console.log(one);
    console.log(two);
    console.log(three);
  }
}
