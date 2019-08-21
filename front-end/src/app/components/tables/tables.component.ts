import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/models/table';
import { TablesService } from 'src/app/services/tables.service';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  nClients:Number;
  tables:Array<Table>;
  errorMessage:String;

  constructor(private socketService:SocketService,private tablesService:TablesService,private router:Router) { }

  ngOnInit() {
    this.nClients=0;
    this.tablesService.getTables().subscribe(
      res => { this.tables = res },
      error=>this.errorMessage = error.statusText,
      () => { console.log(this.tables) }           
    );

    this.socketService.socket.on('update_tables',()=>{
      console.log("ricevuto messaggio");
      this.tablesService.getTables().subscribe(
        (res)=>{this.tables=res},
        (err)=>this.errorMessage=err.statusText,
        ()=>{console.log("done")}
      )
    });


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
    this.router.navigate(['/orders',table.code]);
  }


}
