export class User {

   constructor(){
      this.username="canedidio";
   }

   username:string=null;
   role:string=null;
   password:string=null;
   admin:boolean=false;

   canta(){
      console.log("canta\n\n\n");
   }
}