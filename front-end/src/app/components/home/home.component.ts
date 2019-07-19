import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cane="diocane";
  
  constructor(private auth:AuthService,private tables:TablesService) { }

  ngOnInit() {
  }

  getUsers(){
    this.auth.getUsers().subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err)
    );
  }

  generateTable(){
    this.tables.generateTable().subscribe(
      (res)=>console.log(res),
      (err)=>console.log(err),
      ()=>console.log("done")
    );
  }
  

}
