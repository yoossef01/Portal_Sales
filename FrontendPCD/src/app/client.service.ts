import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Client } from './model/client';
import { BehaviorSubject, of } from 'rxjs';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http:HttpClient) { }


  adduser(user: Client){
    return this.http.post<Client>('http://localhost:8080/api/v1/auth/register', user)
  }
  

  login(email: string, password: string) : Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/auth/authenticate', { email, password });
      
  }
  getToken(): string|null {
    return localStorage.getItem('token');
  }
  checkLoginStatus(): void {
    const token = this.getToken();
    if (token) {
      this.isLoggedIn.next(true);
      console.log('connecté')
    }
  }
  getCurrentClient(): Observable<Client|null> {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwt_decode(token) as { sub: string, exp: string };
      const email = decodedToken.sub;
      return this.getClientByEmail(email);
    }
    return of(null);
  }
  getClientById(id:number):Observable<Client>{
    return this.http.get<Client>("http://localhost:8080/api/client/"+id);
  }
  getClientByEmail(email:string):Observable<Client>{
    return this.http.get<Client>("http://localhost:8080/api/client/email/"+email);
  }
  UpdateClient (client:Client):Observable<Client>{
    return this.http.put<Client>("http://localhost:8080/api/client/update",client)
  }
}
