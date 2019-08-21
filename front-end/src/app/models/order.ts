import { MenuItem } from './menu';

export class Order{

    constructor (table:string,waiter_id:string){
        this._id=null;
        this.table=table;
        this.waiter_id=waiter_id;
        this.worker_id=null;
        this.status=0;
        this.orderNumber=null;
        this.items=new Array();
    }

    _id:string;
    table:string;
    waiter_id:string;
    worker_id:string;
    status:number;
    orderNumber:number;
    items:Array<MenuItem>;

}