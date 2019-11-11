import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../facturas/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private url = 'https://descuento-factura.herokuapp.com/api/v1/facturas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Factura[]>{
    return this.http.get<Factura[]>(this.url);
  }

  getById(id: number): Observable<Factura> {
    const newUrl = this.url + '/' + id;
    return this.http.get<Factura>(newUrl);
  }

  save(fac: Factura):Observable<Factura>{
    return this.http.post<Factura>(this.url,fac);
  }

  update(fac: Factura): Observable<Factura> {
    const newUrl = this.url + '/' + fac.id;
    return this.http.put<Factura>(newUrl,fac);
  }

  delete(id: number): Observable<Factura> {
    const newUrl = this.url + '/' + id;
    return this.http.delete<Factura>(newUrl);
  }

}
