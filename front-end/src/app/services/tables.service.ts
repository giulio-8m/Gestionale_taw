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

  generateTable(){
    return this.http.post<any>(`http://localhost:3000/tables/generate`,null);
  }


}
