import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/models/table';
import { SocketService } from 'src/app/services/socket.service';
import { TablesService } from 'src/app/services/tables.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables-desk',
  templateUrl: './tables-desk.component.html',
  styleUrls: ['./tables-desk.component.css']
})
export class TablesDeskComponent implements OnInit {


  nClients:Number;
  tables:Array<Table>;
  errorMessage:String;

  constructor(private socketService:SocketService,private tablesService:TablesService,private router:Router) { }

  ngOnInit() {
    this.nClients=0;
    
    this.getTables();

    this.socketService.socket.on('update_tables',()=>{
      console.log("ricevuto messaggio");
      this.getTables();
    });
  }

  getTables(){
    this.tablesService.getTables().subscribe(
      res => { this.tables = res },
      error=>this.errorMessage = error.statusText,
      () => { }           
    );
  }

  free(seats:Number){
    return seats==0;
  }

  book(table:Table){
    console.log(`booking ${table.code} for ${table.clientsNumber}`);
    this.tablesService.bookTable(table.code,table.clientsNumber).subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    );
    
    this.socketService.socket.emit('booked_table');

  }

  ordine(event,table:Table){
    this.router.navigate(['/check-out',table.code]);
  }

}
