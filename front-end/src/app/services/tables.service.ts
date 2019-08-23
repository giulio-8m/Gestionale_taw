import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Table } from '../models/table';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(private http:HttpClient) {  }

  getTables(){
    return this.http.get<Array<Table>>('http://localhost:3000/tables');
  }

  getTable(tableCode:string){
    return this.http.get<any>(`http://localhost:3000/tables/${tableCode}`);
  }

  generateTable(){
    return this.http.post<any>(`http://localhost:3000/tables/generate`,null);
  }

  bookTable(tableCode:string,clientsNumber:number){
    return this.http.put<any>(`http://localhost:3000/tables/${tableCode}`,{clients:clientsNumber});
  }




}
