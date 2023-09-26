import { Produit } from "./produit";
import { Vendeur } from "./vendeur";

export class Achat {
    id:number;
    date:Date;
    montant:number;
    nom:string;
    quantite:number;
    product:Produit;
    vendeur:{id: number};
    client : {id: number};
    constructor(id: number, date: Date, montant: number, nom: string, quantite: number, product: Produit, vendeur: { id: number }, client: {id : number}) {
        this.id = id;
        this.date = date;
        this.montant = montant;
        this.nom = nom;
        this.quantite = quantite;
        this.product = product;
        this.vendeur = vendeur;
        this.client = client;
    }
}
