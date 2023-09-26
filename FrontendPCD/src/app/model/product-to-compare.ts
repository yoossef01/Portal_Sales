import { Produit } from "./produit";

export class ProductToCompare {
    id:number;
    product:Produit;
    client:{id:number}
    constructor( id:number,product:Produit, client:{id:number}){
        this.id=id;
        this.product=product;
        this.client=client;
    }
}
