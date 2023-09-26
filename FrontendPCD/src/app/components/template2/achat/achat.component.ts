import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AchatService } from 'src/app/achat.service';
import { CategorieService } from 'src/app/categorie.service';
import { Achat } from 'src/app/model/achat';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { Vendeur } from 'src/app/model/vendeur';
import { ProduitService } from 'src/app/produit.service';
import { VendeurService } from 'src/app/vendeur.service';

@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.css']
})
export class AchatComponent implements OnInit {

  achat!: Achat[];
  vendeur:Vendeur;
  achats: any[] = [];
  categorie : Categorie=new Categorie(1,"",{id:0}); 
  produit : Produit=new Produit("","",0,0,"",this.categorie,0,{id:0}) ;

constructor(private achatservice: AchatService,  private vendeurservice: VendeurService, private produitService: ProduitService, private categorieService: CategorieService) {}
  ngOnInit(): void {
    this.getCurrentVendeur();
  }

  getAchatByVendeur(i: number) {
    this.achatservice.getAchatByVendeur(i).subscribe(data => {
      const requests = [];
      for (let a of data) {
        requests.push(
          this.produitService.getProduct(a.product.id),
          this.categorieService.getCategory(a.product.categorie.id)
        );
      }
      forkJoin(requests).subscribe(results => {
        for (let i = 0; i < data.length; i++) {
          const a = data[i];
          const produit = results[i * 2];
          const categorie = results[i * 2 + 1];
          const dateObj = new Date(a.date);
          this.achats.push({
            id: a.id,
            nom: a.nom,
            quantite: a.quantite,
            montant: a.montant,
            date: dateObj,
            image: produit.id,
            cat: categorie.nom
          });
        }
        console.log("zzeedz", this.achats);
      });
    });
  }

  
  
  
  
  
  
  getCurrentVendeur(){
    this.vendeurservice.getCurrentVendeur().subscribe(vendeur => {if(vendeur) 
    this.vendeur=vendeur;console.log("le vendeur :"+this.vendeur.id+"est connecté"); this.getAchatByVendeur(this.vendeur.id)});}
}
