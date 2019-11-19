import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banco } from '../clases/banco';

@Injectable({
  providedIn: 'root'
})
export class BancosService {

  private url = 'https://descuento-factura.herokuapp.com/api/v1/bancos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Banco[]>{
    return this.http.get<Banco[]>(this.url);
  }

  getById(id: number): Observable<Banco> {
    const newUrl = this.url + '/' + id;
    return this.http.get<Banco>(newUrl);
  }

  save(bank: Banco):Observable<Banco>{
    return this.http.post<Banco>(this.url,bank);
  }

  update(bank: Banco): Observable<Banco> {
    const newUrl = this.url + '/' + bank.id;
    return this.http.put<Banco>(newUrl,bank);
  }

  delete(id: number): Observable<Banco> {
    const newUrl = this.url + '/' + id;
    return this.http.delete<Banco>(newUrl);
  }

  costosgastos(id: number): Observable<any[]>{
    const newUrl = 'https://descuento-factura.herokuapp.com/api/v1/costosgastos?bancoId=' + id;
    return this.http.get<any[]>(newUrl);
  }
}
