export class Vendeur {
   id :number ;
   idTemplate :number;
   nom :string ;
  prenom   :string ;
  nomboutique : string;
  adresse  :string ;
   tel  :string ;
   email  :string ;
    password:string;
   fax  :string ;
   constructor(id: number, idTemplate: number, nom: string, prenom: string, adresse: string, tel: string, email: string, password: string, fax: string) {
      this.id = id;
      this.idTemplate = idTemplate;
      this.nom = nom;
      this.prenom = prenom;
      this.adresse = adresse;
      this.tel = tel;
      this.email = email;
      this.password = password;
      this.fax = fax;
    }
}