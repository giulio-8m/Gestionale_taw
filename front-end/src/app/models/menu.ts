export class MenuItem{
    constructor(type:string,name:string,price:number,preparationTime:number){
        this.name=name;
        this.type=type;
        this.price=price;
        this.preparationTime=preparationTime;
        this.status=null;
        this.amount=null;
    }

    type:string;
    name:string;
    price:number;
    preparationTime:number;
    amount:number;
    status:string;
}