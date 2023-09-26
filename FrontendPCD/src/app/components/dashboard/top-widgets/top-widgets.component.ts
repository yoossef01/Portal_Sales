import { Component, OnInit } from '@angular/core';
import { AchatService } from 'src/app/achat.service';
import { CategorieService } from 'src/app/categorie.service';
import { Achat } from 'src/app/model/achat';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { Vendeur } from 'src/app/model/vendeur';
import { ProduitService } from 'src/app/produit.service';
import { VendeurService } from 'src/app/vendeur.service';

@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.scss']
})
export class TopWidgetsComponent implements OnInit {

  nombreachat : any;
  totalerevenu : number;
  achat : Achat[];
  vendeur : Vendeur;
  produitF : Produit[];
  categories : string[];
  constructor(private achatService: AchatService, private vendeurservice : VendeurService, private service: ProduitService, private sc: CategorieService ,) { this.categories = [];}

  ngOnInit(): void {
    this.getCurrentVendeur();
    
  }

  getCurrentVendeur(){
    this.vendeurservice.getCurrentVendeur().subscribe(vendeur =>
    {if(vendeur) this.vendeur=vendeur;console.log("le vendeur "+this.vendeur.nom+" est connecté")
    this.service.getProductsByVendeur(this.vendeur.id).subscribe(data=>{this.produitF=data; this.getNombreAchat(this.vendeur.id)}    )});}


  getNombreAchat(i : number): void {
    let nombre = 0;
    let totalerevenu: number = 0;
    this.achatService.getAchatByVendeur(i).subscribe(achats => { this.achat = achats;
      for (let a of achats) {
        nombre = nombre + 1;
        totalerevenu = totalerevenu + a.montant;
 
        this.categories.push(a.product.categorie.nom);

      }
      this.nombreachat = nombre;
      this.totalerevenu = totalerevenu;


    })
  }



}
