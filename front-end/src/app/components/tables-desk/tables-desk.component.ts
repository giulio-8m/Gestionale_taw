import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/models/table';
import { SocketService } from 'src/app/services/socket.service';
import { TablesService } from 'src/app/services/tables.service';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-tables-desk',
  templateUrl: './tables-desk.component.html',
  styleUrls: ['./tables-desk.component.css']
})
export class TablesDeskComponent implements OnInit {

  nClients:Number;
  tables:Array<Table>;
  errorMessage:String;

  constructor(private socketService:SocketService,private tablesService:TablesService,private router:Router,ordersService:OrdersService) { }

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

  previous(event,table:Table){
    this.router.navigate(['/orders-desk',table.code]);
  }

  book(table:Table){
    console.log(`booking ${table.code} for ${table.clientsNumber}`);
    this.tablesService.bookTable(table.code,table.clientsNumber).subscribe(
      (res)=>{
        console.log(res+"diocane"); 
      },
      (err)=>console.log(err),
      ()=>{  console.log("booking table");
      this.socketService.socket.emit('booked_table');}
       
    );
  }

  ordine(event,table:Table){
    this.router.navigate(['/check-out',table.code]);
  }

    search(){
    console.log("searching");
    var input = (<HTMLInputElement>document.getElementById("searchTables")).value;
    var filter = input.toLowerCase();
    console.log(filter);
    var listOfUsers = document.getElementById("list-of-ttables");
    console.log(listOfUsers);
    var ttables = listOfUsers.getElementsByClassName("ttable");
    console.log(ttables);
    var ttable;
    var ttablename:string;
    for(var i=0;i<ttables.length;i++){
      ttable=ttables[i].getElementsByClassName('code')[0];
      console.log(ttable);
      ttablename=ttable.textContent.toLowerCase();
      console.log(ttablename)
      if(ttablename.indexOf(filter) > -1) {
        $(ttables[i]).css('display' , "");
      } else {
        $(ttables[i]).css('display' , "none");
      }
    }
  }



}
