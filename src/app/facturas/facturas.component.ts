import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../services/facturas.service';
import { Factura } from './factura';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  facturas: Factura[];

  constructor(
    private facturaService: FacturasService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.facturaService.getAll()
    .subscribe(data => this.facturas=data);
  }

}
