export class User {

   constructor(username:string,password:string,role:string,status:string,completedjobs:number){
      this.username=username;
      this.password=password;
      this.role=role;
      this.salt=null;
      this.status=status;
      this.completedjobs=completedjobs;
   }

   username:string;
   password:string;
   role:string;
   salt:string;
   status:string;
   completedjobs:number;
}