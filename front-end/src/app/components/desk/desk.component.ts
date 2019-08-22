import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})
export class DeskComponent implements OnInit {

  time:Date;

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.time = new Date();
   }, 1000);
  }

}