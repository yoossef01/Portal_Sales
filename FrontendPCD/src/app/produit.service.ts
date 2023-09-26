import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from './model/produit';




@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  public added:boolean=false;
 

  host="http://localhost:8080/apiproduit"
  constructor( private client:HttpClient) {}
  public getAllProducts():Observable<Produit []>
  {
    return this.client.get<Produit []>(this.host+"/all")
  }

  public delete(id:string):Observable<void>
  {
    return this.client.delete<void>(this.host+"/del/"+id)
  }
public getProduct(id:string):Observable<Produit>

{
  return this.client.get<Produit>(this.host+"/productById/"+id)
}


  public addProduit(p: Produit, file: File): Observable<Produit> {
    const formData = new FormData();
    formData.append('file', file);
    console.log(JSON.stringify(p));
    formData.append('product', JSON.stringify(p));
    console.log(formData);

    return this.client.post<Produit>(this.host+"/add", formData);
  }
  

updateProduct(file: File, product: Produit): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('file', file);
  formData.append('product', JSON.stringify(product));
  return this.client.post<Produit>(this.host+"/update", formData);
}
saveP(p:Produit):Observable<Produit>{
  return this.client.post<Produit>(this.host+"/save", p);
}

getProductsByCat(id:number):Observable<Produit[]>{
  return this.client.get<Produit[]>(this.host+"/productByCat/"+id);
}
getProductsByVendeur(id:number):Observable<Produit[]>{
  return this.client.get<Produit[]>(this.host+"/productsByVendeur/"+id);
}}
