import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tasa } from '../clases/tasa';

@Injectable({
  providedIn: 'root'
})
export class TasasService {

  private url = 'https://descuento-factura.herokuapp.com/api/v1/tasas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tasa[]>{
    return this.http.get<Tasa[]>(this.url);
  }

  getById(id: number): Observable<Tasa> {
    const newUrl = this.url + '/' + id;
    return this.http.get<Tasa>(newUrl);
  }

  save(tasa: Tasa):Observable<Tasa>{
    return this.http.post<Tasa>(this.url,tasa);
  }

  update(tasa: Tasa): Observable<Tasa> {
    const newUrl = this.url + '/' + tasa.id;
    return this.http.put<Tasa>(newUrl,tasa);
  }

  delete(id: number): Observable<Tasa> {
    const newUrl = this.url + '/' + id;
    return this.http.delete<Tasa>(newUrl);
  }

  getByBancoId(id: number): Observable<Tasa[]> {
    const newUrl = this.url + '?bancoId=' + id;
    return this.http.get<Tasa[]>(newUrl);
  }
}
