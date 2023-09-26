import { HttpErrorResponse } from '@angular/common/http';
import { NonNullAssert } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { v4 as uuidv4 } from 'uuid';
import { FormGroup, NgForm } from '@angular/forms';
import { CategorieService } from 'src/app/categorie.service';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';
import Swal from 'sweetalert2';
import { HomeComponent } from '../home/home.component';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DetailsComponent } from '../details/details.component';
import { UpdateProductDialogComponent } from '../update-product-dialog/update-product-dialog.component';
import { CommandeService } from 'src/app/commande.service';
import { VendeurService } from 'src/app/vendeur.service';
import { Vendeur } from 'src/app/model/vendeur';
import { Commande } from 'src/app/model/commande';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/app/model/client';
import { Router } from '@angular/router';
import { ProductToCompareService } from 'src/app/product-to-compare.service';
import { ProductToCompare } from 'src/app/model/product-to-compare';



@Component({
  selector: 'app-listeproduits',
  templateUrl: './listeproduits.component.html',
  styleUrls: ['./listeproduits.component.css']
})
export class ListeproduitsComponent implements OnInit {
  produits: Produit[] ;
  private catadded =false;
  produitF!:Produit[];
  nomNewCat:string;
  vendor:Vendeur;
  categorieProduit:Categorie=new Categorie(0,"",{id:0}); 
  produit:Produit=new Produit("","",0,0,"",this.categorieProduit,0,{id:0}) ;
  cat:Categorie ;
  idCategorie:number;
  categories:Categorie[]=[];
  vendeurF:Vendeur[]=[];
  photo:File;
  vendeur:Vendeur;
  client:Client;
  idTemplate : number;
  vendeurs:Vendeur[]=[];
  selectedBoutiqueId:number;
  afficherBouton = false;
  produitsComapred:ProductToCompare[]=[];

 productToCompare:ProductToCompare=new ProductToCompare(1,this.produit,{id:0})
   constructor(private service:ProduitService,private sc:CategorieService,public dialog:MatDialog,private router: Router,
    private commandeService: CommandeService,private pc:ProductToCompareService,
    private clientservice :ClientService,private vendeurservice:VendeurService) { }

  ngOnInit(): void {
//this.texte=this.vendeurservice.recherche;
     this.getAll()
       this.getCurrentClient();
    ;}
    getCurrentClient(){
      this.clientservice.getCurrentClient().subscribe(client =>
      {if(client) this.client=client;console.log("le client "+this.client.id+" est connecté")})}
    getAll()
    {
      this.service.getAllProducts().subscribe(data=>{this.produitF=data;this.produits=this.produitF;
        if(this.vendeurservice.recherche){
        this.produitF=this.filtrer(this.vendeurservice.recherche);console.log(this.vendeurservice.recherche)}
        else{this.produits=this.produitF;}
      })
      this.vendeurservice.getAllVendeurs().subscribe(data=>{this.vendeurs=data;this.vendeurF=this.vendeurs;
        console.log(this.vendeurs)})
    }
    //les fonctions de barre de rechreche
  set texte(ch:string)
    {
    
   this.produitF=this.filtrer(ch);
    }
  filtrer(mot:string)
    {
     return this.produits.filter(x=>x.nom.indexOf(mot)!=-1)
    }
    set texteBoutique(ch:string)
    {
   this.vendeurs=this.filtrerBoutique(ch);
    }
  filtrerBoutique(mot:string)
    {
     return this.vendeurF.filter(x=>x.nomboutique.indexOf(mot)!=-1)
    }
  
    onClick() {
      this.afficherBouton = true;
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



getVendeurById(n : number) {
  this.vendeurservice.getVendeurById(n).subscribe(data=>{this.vendeur = data;
  this.vendeurservice.setIdVendeur(n);
console.log(""+this.vendeurservice.idvendeur)
 this.vendeurservice.setIdTemplate(this.vendeur.idTemplate);
  this.router.navigate(['/templateclient/'+this.vendeur.idTemplate+'/'+n])
})
}


selectBoutique(event: any) {
  if (event.target.checked) {
    this.selectedBoutiqueId = parseInt(event.target.value);
    this.vendeurservice.getVendeurById(this.selectedBoutiqueId).subscribe(data => {
      this.vendor = data;
      this.produitF = this.produits.filter(x => x.vendeur.id === this.vendor.id);
    });
  } else {
    this.selectedBoutiqueId = 0;
    this.produitF = this.produits;
  }
}
getVendeurByNomboutique(nomboutique : string) {

  this.vendeurservice.getVendeurByNomboutique(nomboutique).subscribe(data=>{this.vendeur=data;
  this.vendeurservice.setIdVendeur(data.id);
  console.log(""+this.vendeurservice.idvendeur)
   // this.router.navigate(['templateclient/'+data.idTemplate+'/'+data.id]);

  })
}
}
