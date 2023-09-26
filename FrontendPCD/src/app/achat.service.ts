import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Achat } from './model/achat';
import { Observable } from 'rxjs';
import { Categorie } from './model/categorie';

@Injectable({
  providedIn: 'root'
})
export class AchatService {

Page:string;



  host="http://localhost:8080/apiachat"
  constructor(private client:HttpClient) {}

  saveAchat(achat:Achat) : Observable<Achat> {
    return this.client.post<Achat>(this.host+"/save", achat);
  }

  getAllAchat(): Observable<Achat[]> {
    return this.client.get<Achat[]>(this.host+"/all")
  }

  getAchatById(id : number): Observable<Achat> {
    return this.client.get<Achat>(this.host+"/achatById/"+id)

  }
  getAchatByVendeur(id:number): Observable<Achat[]> {
    return this.client.get<Achat[]>(this.host+"/achatByVendeur/"+id)
  }
  
}
