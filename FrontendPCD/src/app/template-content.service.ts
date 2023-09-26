import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TemplateContent } from './model/template-content';

@Injectable({
  providedIn: 'root'
})
export class TemplateContentService {
  host="http://localhost:8080/apitemplate"
  constructor( private client:HttpClient) {}
  
  public getTemplateByVendeur(id:number):Observable<TemplateContent>{
    return this.client.get<TemplateContent >(this.host+"/vendeur/"+ id)
  }
  public createTemplateContent(template:TemplateContent,photo:File):Observable<TemplateContent>{
    const formData = new FormData();
    formData.append('template', JSON.stringify(template));
    formData.append('photo', photo);
    console.log(formData);
  return this.client.post<TemplateContent>(this.host+"/add",formData)
  }
  public updateTemplateContent(template: TemplateContent,photo:File ):Observable<TemplateContent>{
    const formData = new FormData();
    formData.append('template', JSON.stringify(template));
    formData.append('photo', photo);
    console.log(formData);
    return this.client.put<TemplateContent >(this.host+"/update",formData)
  }
  
}
