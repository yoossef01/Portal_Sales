import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from './model/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  host="http://localhost:8080/apicategory"
  constructor( private client:HttpClient) {}
  public getCategory(id:number):Observable<Categorie>

{
  return this.client.get<Categorie>(this.host+"/catgorieById/"+id)
}
public getAllCategories():Observable<Categorie []>
{
  return this.client.get<Categorie []>(this.host+"/all")
}
public getAllCategoriesByVendeur(id:number):Observable<Categorie[]>{
  return this.client.get<Categorie[]>(this.host+"/categoriesByVend/"+id)
}
public addCategorie(cat:Categorie): Observable<Categorie>{
  console.log(cat);
  return this.client.post<Categorie>(this.host+"/add",cat)

}
public deletecat(id:number):Observable<void>{
  return this.client.delete<void>(this.host+"/del/"+id)
}
modifierCategorie(id: number, categorieModifiee: Categorie): Observable<Categorie> {
  const url = `${this.host+"/update"}/${id}`;

  return this.client.put<Categorie>(url, categorieModifiee);
}

}
