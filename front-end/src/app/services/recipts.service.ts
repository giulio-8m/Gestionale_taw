import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipt } from '../models/recipt';

@Injectable({
  providedIn: 'root'
})
export class ReciptsService {

  constructor(private http:HttpClient) { }


  getRecipts(query?:string){
    if(query){
      return this.http.get<any>(`http://localhost:3000/recipts${query}`);
    }else{
     return this.http.get<any>(`http://localhost:3000/recipts`);
    }
  }

  newRecipts(recipt:Recipt){
    return this.http.post<any>(`http://localhost:3000/recipts`,recipt);
  }

}
