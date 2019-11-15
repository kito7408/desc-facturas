import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Factura } from '../facturas/factura';
import { FacturasService } from '../services/facturas.service';

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

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private facturaService: FacturasService) { 
      this.created = false;
      this.updated = false;
      this.error = false;
      this.route.params.subscribe((params) => {
        if (params['id']){
          this.paramId = params['id'];
          this.facturaService.getById(this.paramId).subscribe((result) => {
            this.factura = result;
            console.log(result);
          })
        } else{
          this.paramId = undefined;
        }
      })
    }

  ngOnInit() {
  }

  update(): void {
    this.facturaService.update(this.factura).subscribe((result) => {
      console.log(result);
      this.updated = true;
    }, (error) => {
      console.log(error);
      this.error = true;
    })
  }

  create(): void {
    this.facturaService.save(this.factura).subscribe((result) => {
      console.log(result);
      this.created = true;
    }, (error) => {
      console.log(error);
      this.error = true;
    })
  }

  back(): void {
    this._router.navigate(["facturas"]);
  }
}
