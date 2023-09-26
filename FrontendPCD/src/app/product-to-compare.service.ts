import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductToCompare } from './model/product-to-compare';

@Injectable({
  providedIn: 'root'
})
export class ProductToCompareService {
  host="http://localhost:8080/apiproductToCompare"
  constructor(private client:HttpClient) { }
public getProductToComparesByClient(id:number):Observable<ProductToCompare[]>{
  return this.client.get<ProductToCompare[]>(this.host+"/all/"+id);
}
public addProductToCompare(p:ProductToCompare):Observable<ProductToCompare>
{
  return this.client.post<ProductToCompare>(this.host+"/add",p);
}
public deleteProductToCompare(id:number):Observable<void>{
  return this.client.delete<void>(this.host+"/del/"+id);
}
}
