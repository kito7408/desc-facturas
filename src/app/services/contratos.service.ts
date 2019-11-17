import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrato } from '../clases/contrato';

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  private url = 'https://descuento-factura.herokuapp.com/api/v1/contratos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Contrato[]>{
    return this.http.get<Contrato[]>(this.url);
  }

  getById(id: number): Observable<Contrato> {
    const newUrl = this.url + '/' + id;
    return this.http.get<Contrato>(newUrl);
  }

  save(facID: number, bankID: number, tasaID: number, fecha: Date):Observable<Contrato>{

    let data = {
      facturaId: facID,
      bancoId: bankID,
      tasaId: tasaID,
      fechaGiro: fecha
    }
    return this.http.post<Contrato>(this.url,data);
  }

  update(con: Contrato): Observable<Contrato> {
    const newUrl = this.url + '/' + con.id;
    return this.http.put<Contrato>(newUrl,con);
  }

  delete(id: number): Observable<Contrato> {
    const newUrl = this.url + '/' + id;
    return this.http.delete<Contrato>(newUrl);
  }
}
