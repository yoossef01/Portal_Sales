import { Produit } from "./produit";


export class Commande {
    id:number;
    nom:string;
    montant:number;
    date:Date;
    quantite:number;
    product:Produit;
    client:{id:number};
    constructor(id: number, nom: string, montant: number, date: Date, quantite: number, product: Produit, client: { id: number }) {
        this.id = id;
        this.nom = nom;
        this.montant = montant;
        this.date = date;
        this.quantite = quantite;
        this.product = product;
        this.client = client;
      }
   
}

