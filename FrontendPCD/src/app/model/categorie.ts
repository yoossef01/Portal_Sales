export class Categorie {
    id:number;
    nom:string;
    vendeur: {id: number};
    constructor(id: number, nom: string, vendeur: { id: number }) {
        this.id = id;
        this.nom = nom;
        this.vendeur = vendeur;
      }
}
