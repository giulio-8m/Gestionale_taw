import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/models/table';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  nClients:Number;
  tables:Array<Table>;
  errorMessage:String;

  constructor(private tablesService:TablesService) { }

  ngOnInit() {
    this.nClients=0;
    this.tablesService.getTables().subscribe(
      res => { this.tables = res },
      error=>this.errorMessage = error.statusText,
      () => { console.log(this.tables) }           
    );
  }

  free(seats:Number){
    return seats==0;
  }

  ordine(event,table:Table){
    console.log(table);
  }


}
