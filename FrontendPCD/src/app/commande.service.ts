import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { Commande } from './model/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  host="http://localhost:8080/apicommande";
  constructor(private client:HttpClient) { }
  getAllCommandes(): Observable<Commande[]> {
    return this.client.get<Commande[]>(this.host+"/all");
  }
  getCommandeById(id: number): Observable<Commande> {
    const url = `${this.host}/${id}`;
    return this.client.get<Commande>(url);
  }
  getCommandesByClient(id:number):Observable<Commande[]>{
    return this.client.get<Commande[]>(this.host+"/commandesByClient/"+id);
  }
  addCommande(achat:Commande): Observable<Commande> {
    return this.client.post<Commande>(this.host+"/add", achat);
  }

  updateCommande( achat: Commande): Observable<Commande> {
    const url = `${this.host+"/update"}`;
    return this.client.put<Commande>(url, achat);
  }

  deleteCommande(id: number): Observable<Commande> {
    const url = `${this.host}/del/${id}`;
    return this.client.delete<Commande>(url);
  }

  getCommandesByDate(dateDebut: string, dateFin: string): Observable<Commande[]> {
    const url = `${this.host+"/by-date"}/search?dateDebut=${dateDebut}&dateFin=${dateFin}`;
    return this.client.get<Commande[]>(url);
  }
}
