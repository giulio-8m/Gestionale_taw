import { MenuItem } from './menu';

export class Order{

    constructor (table:string,waiter_id:string){
        this._id=null;
        this.table=table;
        this.waiter_id=waiter_id;
        this.status="ongoing";
        this.progress=0;
        this.kitchenOrderNumber=null;
        this.barOrderNumber=null;
        this.items=new Array();
        this.date=new Date();
    }

    _id:string;
    table:string;
    waiter_id:string;
    status:string;
    progress:number;
    kitchenOrderNumber:number;
    barOrderNumber:number;
    items:Array<MenuItem>;
    date:Date;

}