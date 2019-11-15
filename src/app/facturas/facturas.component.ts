import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../services/facturas.service';
import { Factura } from './factura';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  facturas: Factura[];
  userId: number;

  constructor(
    private facturaService: FacturasService,
    private _router: Router
  ) { 
    if(localStorage.getItem('userID')){
      this.userId = parseInt(localStorage.getItem('userID'));
    } else {
      this._router.navigate(["login"]);
    }
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.facturaService.getAll()
    .subscribe(data => this.facturas=data);
  }

  getByUserId(): void {
    this.facturaService.getByUserId(this.userId).subscribe((result) => {
      this.facturas = result;
    })
  }

  detail(id: string): void {
    this._router.navigate(['facturas/' + id]);
  }

  newFac(): void {
    this._router.navigate(['facturas/new']);
  }
}
