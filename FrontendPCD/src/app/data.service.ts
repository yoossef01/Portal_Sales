import { Injectable } from '@angular/core';
import { Data } from './model/data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private client:HttpClient) { }
  getAllData():Observable<Data[]>{
    return this.client.get<Data[]>("http://localhost:8080/api/data");
  }
}
