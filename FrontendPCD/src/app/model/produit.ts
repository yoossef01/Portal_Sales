import {Categorie} from "./categorie"
import { Vendeur } from "./vendeur";
export class Produit {
    id: string;
    nom:string;
    prix:number;
    quantite:number;
    photo:string;
    categorie: Categorie;
    prix_achat:number;
    vendeur: {id: number};
    
    constructor(id: string, nom: string, prix: number, quantite: number, photo: string, categorie: Categorie, prix_achat: number, vendeur: { id: number }) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.quantite = quantite;
        this.photo = photo;
        this.categorie = categorie;
        this.prix_achat = prix_achat;
        this.vendeur = vendeur;
      }
    
}

