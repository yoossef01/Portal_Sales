import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategorieService } from 'src/app/categorie.service';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';
import { ViewChild } from '@angular/core';
import { VendeurService } from 'src/app/vendeur.service';
import { Vendeur } from 'src/app/model/vendeur';
import { v4 as uuidv4 } from 'uuid';
import { Description } from 'src/app/model/description';
import { DescriptionService } from 'src/app/description.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
@ViewChild('myInput')
myInputVariable: ElementRef;
img:string;
isNomEmpty: boolean;
categorieProduit:Categorie=new Categorie(0,"",{id:0}); 
produit:Produit=new Produit("","",0,0,"",this.categorieProduit,0,{id:0}) ;
idCategorie:number;
photo:File;
categories:Categorie[]=[];
dat: any[] = [];
vendeur:Vendeur; 
suivant:boolean=false;
precedent:boolean=false;
description:Description=new Description("","","","","",{id:""});

constructor(public dialogRef: MatDialogRef<DialogBoxComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
private service:ProduitService,private sc:CategorieService,private vendeurservice :VendeurService,
private ds:DescriptionService,private router: Router,private dataservice : DataService) { }


 ngOnInit(): void {
  
    this.getCurrentVendeur();
    this.img="./assets/150x150.png";}
   
  getcategoriie(i : number)
  {
    this.sc.getAllCategoriesByVendeur(i).subscribe(data=>{this.categories=data; this.categories=this.categories
    })
  }

  getdata()
  {
    this.dataservice.getAllData().subscribe(data=>{
      for (let a of data) {
        if (a.product_nom == this.produit.nom)
         {this.dat.push({id : a.product_prix})}
      }
    })
  }
  
  getCurrentVendeur(){
    this.vendeurservice.getCurrentVendeur().subscribe(vendeur => {if(vendeur) 
    this.vendeur=vendeur;console.log("le vendeur :"+this.vendeur.id+"est connecté");
    this.getcategoriie(this.vendeur.id);
  });}
  

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
   
    this.idCategorie=(parseInt(event.target.value));
    this.getCategoryById(this.idCategorie);
    console.log(''+this.idCategorie)
  }
 
  getCategoryById(id:number){
    this.sc.getCategory(id).subscribe(data=>{this.categorieProduit=data}); }
  
  
  
  addProduit(): void {
    this.produit.id=uuidv4();
    this.getCategoryById(this.produit.categorie.id);
    this.produit.categorie=this.categorieProduit;
    this.produit.vendeur.id=this.vendeur.id;
    this.service.addProduit(this.produit,this.photo).subscribe(()=>
   { this.description.product.id=this.produit.id;
    this.addDescription();
    Swal.fire({
      //position: 'top-end',
      icon: 'success',
      title: 'le produit a été ajouté avec succès',
      showConfirmButton: false,
      timer: 1500
 })
    this.restProduit();
    this.resetPhoto();
    this.photo=new File([], '');
    
    
    // Charger la liste des produits
    // this.listeProduits = this.serviceProduit.getListeProduits();
  } );
   this.isNomEmpty = this.produit.nom.trim() === '';}
   
   
   //ajout Description
    addDescription():void{
    this.description.id=uuidv4();
    console.log(""+this.description.product.id)
     this.ds.addDescription(this.description).subscribe(()=>console.log(this.description))    }


   precedentButton(){
    this.suivant=false;
    
   }
   suivantButton(){this.suivant=true;}
     //fermer la fenetre de l'ajout du produit
  onCancel(): void {
    this.dialogRef.close();

  }

}
