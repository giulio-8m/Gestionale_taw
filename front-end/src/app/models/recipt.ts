import { MenuItem } from './menu';

export class Recipt{

    constructor (table:string,ordersBarItems:Array<MenuItem>,ordersKitchenItems:Array<MenuItem>,totalBar:number,totalKitchen:number,total:number){
        this._id=null;
        let dateS=new Date();
        this.date=dateS.getDate()+'/'+dateS.getMonth()+'/'+dateS.getFullYear();
        this.table=table;
        this.ordersBarItems=ordersBarItems;
        this.ordersKitchenItems=ordersKitchenItems;
        this.totalBar=totalBar;
        this.totalKitchen=totalKitchen;
        this.total=total;
    }
    _id:string;
    date:string;
    table:string;
    ordersBarItems:Array<MenuItem>;
    ordersKitchenItems:Array<MenuItem>;
    totalBar:number;
    totalKitchen:number;
    total:number;


}