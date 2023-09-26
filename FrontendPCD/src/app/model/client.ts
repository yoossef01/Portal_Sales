export class Client {
    id:number;
    nom : string;
    prenom : string;
    adresse : string;
    tel : string;
    email : string;
    password: string;
    
  constructor(id: number, nom: string, prenom: string, adresse: string, tel: string, email: string, password: string) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.adresse = adresse;
    this.tel = tel;
    this.email = email;
    this.password = password;
  }
}
