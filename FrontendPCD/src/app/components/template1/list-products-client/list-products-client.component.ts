import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/categorie.service';
import { ClientService } from 'src/app/client.service';
import { Categorie } from 'src/app/model/categorie';
import { Client } from 'src/app/model/client';
import { ProductToCompare } from 'src/app/model/product-to-compare';
import { Produit } from 'src/app/model/produit';
import { ProductToCompareService } from 'src/app/product-to-compare.service';

import { ProduitService } from 'src/app/produit.service';
import { VendeurService } from 'src/app/vendeur.service';

@Component({
  selector: 'app-list-products-client',
  templateUrl: './list-products-client.component.html',
  styleUrls: ['./list-products-client.component.css']
})
export class ListProductsClientComponent implements OnInit {
 
  
  produitF!:Produit[];
  produits!:Produit[];
  client:Client;
  categories:Categorie[]=[];
  selectedCategoryId: number;
  categorie:Categorie;
  produitsComapred:ProductToCompare[]=[];
  afficherBouton = false;
  categorieProduit:Categorie=new Categorie(0,"",{id:0}); 
  produit:Produit=new Produit("","",0,0,"",this.categorieProduit,0,{id:0}) ;
  productToCompare:ProductToCompare=new ProductToCompare(1,this.produit,{id:0})

  
constructor(private clientservice: ClientService,private sc:CategorieService,private service:ProduitService, 
  private vendeurservice:VendeurService, private router:Router,private pc:ProductToCompareService){}
ngOnInit(): void {
    
  this.getAll();
  this.getCurrentClient();
}

onClick() {
  this.afficherBouton = true;
}
set texte(ch:string)
{
this.produitF=this.filtrer(ch);
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
    this.router.navigate(['/templateclient/1/'+this.vendeurservice.getIdVendeur()]);
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

navigation1() {
  this.router.navigate(['Panier/'+ this.client.id])
}

addProductsToCompare(id:string){
  this.service.getProduct(id).subscribe(data=>{this.produit=data;
    this.productToCompare.product=data;
    this.productToCompare.client.id=this.client.id;console.log(this.productToCompare);
      this.pc.addProductToCompare(this.productToCompare).subscribe(()=>{console.log("produit"+ this.productToCompare +"est à comparer")
    ;this.pc.getProductToComparesByClient(this.client.id).subscribe(data => {
      this.produitsComapred = data;})
  })})
  
}

}
