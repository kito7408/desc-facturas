import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../clases/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = 'https://descuento-factura.herokuapp.com/api/v1/usuarios';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }

  getById(id: number): Observable<Usuario> {
    const newUrl = this.url + '/' + id;
    return this.http.get<Usuario>(newUrl);
  }

  save(user: Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.url,user);
  }

  update(user: Usuario): Observable<Usuario> {
    const newUrl = this.url + '/' + user.id;
    return this.http.put<Usuario>(newUrl,user);
  }

  delete(id: number): Observable<Usuario> {
    const newUrl = this.url + '/' + id;
    return this.http.delete<Usuario>(newUrl);
  }

  login(user: string, pass: string): Observable<any> {
    const newUrl = this.url + '/login';
    var userData = {
      usuario: user,
      password: pass
    }
    return this.http.post<any>(newUrl, userData);
  }
}
