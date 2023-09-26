import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Description } from './model/description';

@Injectable({
  providedIn: 'root'
})
export class DescriptionService {
  host="http://localhost:8080/apidescription"
  constructor( private client:HttpClient) {}

  public getDescription(id: string):Observable<Description>
  {
    return this.client.get<Description >(this.host+"/"+ id)
  }
public getAllDescriptions():Observable<Description[]>{
  return this.client.get<Description[]>(this.host+"/all")
}
  public getDescriptionByProduct(id: string):Observable<Description>{
    return this.client.get<Description >(this.host+"/product/"+ id)
  }
  
  public addDescription(d: Description):Observable<Description>{
    return this.client.post<Description >(this.host+"/add",d)
  }

  public updateDescription(d: Description):Observable<Description>{
    return this.client.put<Description >(this.host+"/update",d)
  }

}
