import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategorieService } from 'src/app/categorie.service';
import { ClientService } from 'src/app/client.service';
import { DescriptionService } from 'src/app/description.service';
import { Categorie } from 'src/app/model/categorie';
import { Client } from 'src/app/model/client';
import { Description } from 'src/app/model/description';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';
import { VendeurService } from 'src/app/vendeur.service';

@Component({
  selector: 'app-list-products-client3',
  templateUrl: './list-products-client3.component.html',
  styleUrls: ['./list-products-client3.component.css']
})
export class ListProductsClient3Component implements OnInit {
  produitF!:Produit[];
  produits!:Produit[];
  client:Client;
  categories:Categorie[]=[];
  selectedCategoryId: number;
  categorie:Categorie;
  categorieProduit:Categorie;
  texte:string;
  descriptions: {[key: string]: Description} = {};
constructor(private clientservice: ClientService,private sc:CategorieService,
  private service:ProduitService, private vendeurservice:VendeurService,
   private router:Router,private ds:DescriptionService){}
ngOnInit(): void {
    
  this.getAll();
  this.getCurrentClient();
  this.ds.getAllDescriptions().subscribe((descriptions: Description[]) => {
    console.log("des",descriptions);
    descriptions.forEach(description => {
      this.descriptions[description.product.id] = description;
    });
  });
}


searchProducts()
{
this.produitF=this.filtrer(this.texte);
}
filtrer(mot:string)
{
 return this.produits.filter(x=>x.nom.indexOf(mot)!=-1)
}


getcategoriie(i : number)
  {
    this.sc.getAllCategoriesByVendeur(i).subscribe(data=>{this.categories=data; this.categories=this.categories
    console.log(data)})
  }
getproduitByVendeur(i : number)
  {
   this.service.getProductsByVendeur(i).subscribe(data=>{this.produitF=data;this.produits=this.produitF})
  }

   getAll()
 {
  this.getproduitByVendeur(this.vendeurservice.getIdVendeur())
  console.log(""+this.vendeurservice.getIdVendeur());
  this.getcategoriie(this.vendeurservice.getIdVendeur())
 }


getCurrentClient(){
    this.clientservice.getCurrentClient().subscribe(client =>
    {if(client) this.client=client;console.log("le client "+this.client.id+" est connecté");
  
})
  }


navigation() {
    this.router.navigate(['/template/1/'+this.vendeurservice.getIdVendeur()]);
  }
selectCategorie(event: any) {
    if (event.target.checked) {
        this.selectedCategoryId = parseInt(event.target.value);
        this.sc.getCategory(this.selectedCategoryId).subscribe(data => {
            this.categorie = data;
            this.categorieProduit = this.categorie;
            this.produitF = this.produits.filter(x => x.categorie.nom.indexOf(this.categorieProduit.nom) != -1);
        });
    } else {
        this.selectedCategoryId = 0;
        this.produitF = this.produits;
    }
}

getDescription(id: string): string {
  return this.descriptions[id]?.shortDescription || '';
}
navigation1() {
  this.router.navigate(['Panier/'+ this.client.id])
}
}
