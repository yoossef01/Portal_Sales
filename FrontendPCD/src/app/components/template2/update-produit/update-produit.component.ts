
import { Component, ElementRef, Inject, OnInit } from '@angular/core';

import { CategorieService } from '../../../categorie.service';
import { Produit } from 'src/app/model/produit';
import { Categorie } from 'src/app/model/categorie';
import Swal from 'sweetalert2';
import { ProduitService } from '../../../produit.service';
import { ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendeur } from 'src/app/model/vendeur';
import { VendeurService } from 'src/app/vendeur.service';
import { v4 as uuidv4 } from 'uuid';
import { DescriptionService } from 'src/app/description.service';
import { Description } from 'src/app/model/description';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.css']
})
export class UpdateProduitComponent implements OnInit {
@ViewChild('myInput')
myInputVariable!: ElementRef;
img:string;
categorieProduit:Categorie=new Categorie(0,"",{id:0}); 

categories!:Categorie[];
categorie: Categorie  =new Categorie(0,"",{id:0}); 
produit:Produit=new Produit("","",0,0,"",this.categorie,0,{id:0}) ;
photo!:File;
vendeur:Vendeur;
description:Description=new Description("","","","","",{id:""});
idCategorie:number;
id: string;
id1: number;
  
constructor( private service:ProduitService,private sc:CategorieService,private router: Router,private ds:DescriptionService,
  private vendeurservice:VendeurService,private route: ActivatedRoute,
) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getProduct(this.id).subscribe(data => {
      this.produit = data;console.log("deedqs",this.produit)
    })
    this.getCurrentVendeur();
   
}
  getCurrentVendeur(){
    this.vendeurservice.getCurrentVendeur().subscribe(vendeur =>
    {if(vendeur) this.vendeur=vendeur;console.log("le vendeur "+this.vendeur.nom+" est connecté");this.getAllCategoriesByVendeur(this.vendeur.id);});
}
  
  getAllCategoriesByVendeur(i : number){
      this.sc.getAllCategoriesByVendeur(i).subscribe(data=>{this.categories=data; this.categories=this.categories})
    }
  
  //selectionner une image a partir de votre bureau ,s'excecuter a l'appui pour ajouter une image de nouveau produit
  onPhotoSelected(event: any): void {
    this.photo =event.target.files[0];
    if (this.photo) {
       const reader = new FileReader();
       reader.readAsDataURL(this.photo);
       reader.onload = () => {
         this.img = reader.result as string;};
     }}
     
  // deselectionner la photo  apres l'ajout du produit
  resetPhoto() {
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.files);}

  // Vider le formulaire et recharger la liste des produits
  restProduit(){
    this.categorieProduit=new Categorie(0,"",{id:0});
    this.produit = new Produit("", "", 0, 0, "", this.categorieProduit, 0, {id: 0});
  }
  //extraire la categorie selectionner a partir de la base de données
  selectCat(event:any){

    this.id1=(parseInt(event.target.value));
    this.getCategoryById(this.id1);
   
 
 }
 
  getCategoryById(id:number){
    this.sc.getCategory(id).subscribe(data=>{this.categorieProduit=data}); }
  

    updateProduit(): void {
      this.getCategoryById(this.id1);
    
      
     
       
    this.service.updateProduct(this.photo,this.produit).subscribe(
       response => {
         console.log(response);
         //console.log(JSON.stringify(this.newProduit));
         console.log(this.produit);
         
         // Vider le formulaire et recharger la liste des produits
         this.produit = new Produit("","",0,0,"",this.categorie,0,{id:0}) ;
    
    
         // Charger la liste des produits
         // this.listeProduits = this.serviceProduit.getListeProduits();
       },
      
     );
     this.router.navigate(['/template/' + this.vendeur.idTemplate + '/' + this.vendeur.id]);
    }
  
  
 
 //ajout Description
}
