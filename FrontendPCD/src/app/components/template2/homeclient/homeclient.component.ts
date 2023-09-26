

import { HttpErrorResponse } from '@angular/common/http';
import { NonNullAssert } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

import { FormGroup, NgForm } from '@angular/forms';
import { CategorieService } from 'src/app/categorie.service';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { VendeurService } from 'src/app/vendeur.service';
import { Vendeur } from 'src/app/model/vendeur';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/app/model/client';

@Component({
  selector: 'app-homeclient',
  templateUrl: './homeclient.component.html',
  styleUrls: ['./homeclient.component.css']
})

export class HomeclientComponent implements OnInit {



  produits: Produit[] ;
  public isCollapsed = false;
  public isCollapsed2 = false;
  private catadded =false;
  produitF!:Produit[];
  nomNewCat:string;
  newCategory: Categorie;
  categorieProduit:Categorie=new Categorie(0,"",{id:0}); 
  produit:Produit=new Produit("","",0,0,"",this.categorieProduit,0,{id:0}) ;
  produitModifie:Produit=new Produit("","",0,0,"",this.categorieProduit,0,{id:0}) ;
  idCategorie:number;
  categories!:Categorie[];
  photo:File;
  vendeur:Vendeur=new Vendeur(0,0,"","","","","","","");
  idVendeur: number;
  client!:Client;


  set texte(ch:string)
  {
 this.produitF=this.filtrer(ch);
  }
  filtrer(mot:string)
  {
   return this.produits.filter(x=>x.nom.indexOf(mot)!=-1)
  }
   constructor(private ar:ActivatedRoute,private service:ProduitService,private sc:CategorieService,public dialog:MatDialog,private clientservice:ClientService,private router: Router,private vendeurservice:VendeurService) {
    this.idVendeur = this.vendeurservice.getIdVendeur();
    }

   getcategoriie()
   {
     this.sc.getAllCategoriesByVendeur(this.idVendeur).subscribe(data=>{this.categories=data; this.categories=this.categories
     console.log(data)})
   }
   getproduitByVendeur()
   {
    this.service.getProductsByVendeur(this.idVendeur).subscribe(data=>{this.produitF=data; this.produits=this.produitF})
   }

   getCurrentClient(){
    this.clientservice.getCurrentClient().subscribe(client =>
    {if(client) this.client=client;console.log("le client "+this.client.id+" est connecté");
  })}

 getAll()
 {this.getCurrentClient()
  this.getproduitByVendeur()
  this.getcategoriie()
 }
   ngOnInit(): void {
    
    // let idStr = this.ar.snapshot.paramMap.get('id');
    // if (idStr) {
    //   let id = parseInt(idStr);
    //   console.log(id);
    //   this.service.getProductsByVendeur(id).subscribe(data=>this.produitF=data);
    this.getAll();
    // } else {
    //   console.log('id is null');
    // }
    //  setInterval(() => {
    //   this.added();
    // }, 1000);
    // setInterval(() => {
    //   this.Catadded();
    // }, 1000);
    ;
 

   }
  added(){
    if(this.service.added==true){
      this.getAll();
    }
    this.service.added=false;
  }
  Catadded(){
    if(this.catadded==true){
      this.getAll();
    }
    this.catadded=false;
  }
 delete(p:Produit)
 {
   const swalWithBootstrapButtons = Swal.mixin({
     customClass: {
       confirmButton: 'btn btn-success',
       cancelButton: 'btn btn-danger'
     },
     buttonsStyling: false
   })
   
   swalWithBootstrapButtons.fire({
     title: 'Are you sure?',
     text: "You won't be able to revert this!",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonText: 'Yes, delete it!',
     cancelButtonText: 'No, cancel!',
     reverseButtons: true
   }).then((result) => {
     if (result.isConfirmed) {
       this.service.delete(p.id).subscribe(()=>
       {this.produitF.splice(this.produitF.indexOf(p),1);
 
       swalWithBootstrapButtons.fire(
         'Deleted!',
         'Your file has been deleted.',
         'success'
       );})
     } else if (
       /* Read more about handling dismissals below */
       result.dismiss === Swal.DismissReason.cancel
     ) {
       swalWithBootstrapButtons.fire(
         'Cancelled',
         'Your imaginary file is safe :)',
         'error'
       )
     }
   })
   

  
}
deletecat(cat:Categorie)
 {
   const swalWithBootstrapButtons = Swal.mixin({
     customClass: {
       confirmButton: 'btn btn-success',
       cancelButton: 'btn btn-danger'
     },
     buttonsStyling: false
   })
   
   swalWithBootstrapButtons.fire({
     title: 'Are you sure?',
     text: "You won't be able to revert this!",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonText: 'Yes, delete it!',
     cancelButtonText: 'No, cancel!',
     reverseButtons: true
   }).then((result) => {
     if (result.isConfirmed) {
       this.sc.deletecat(cat.id).subscribe(()=>
       {this.categories.splice(this.categories.indexOf(cat),1);
 
       swalWithBootstrapButtons.fire(
         'Deleted!',
         'Your file has been deleted.',
         'success'
       );})
     } else if (
       /* Read more about handling dismissals below */
       result.dismiss === Swal.DismissReason.cancel
     ) {
       swalWithBootstrapButtons.fire(
         'Cancelled',
         'Your imaginary file is safe :)',
         'error'
       )
     }
   })
   

  
}
getCategoryById(id:number){
  this.sc.getCategory(id).subscribe(data=>{this.categorieProduit=data;
     this.produit.categorie=this.categorieProduit});
 
}

 
 onPhotoSelected(event: any) {
  this.photo = event.target.files[0];
}
updateProduit(): void {
   this.getCategoryById(this.idCategorie);
   
   
  
    
 this.service.updateProduct(this.photo,this.produitModifie).subscribe(
    response => {
      console.log(response);
      //console.log(JSON.stringify(this.newProduit));
      console.log(this.produitModifie);
      
      // Vider le formulaire et recharger la liste des produits
      
      this.produitModifie=new Produit("","",0,0,"",this.categorieProduit,0,{id:0}) ;
      
      this.photo=new File([], '');


      // Charger la liste des produits
      // this.listeProduits = this.serviceProduit.getListeProduits();
    },
   
  );
}

 selectCat(event:any){

   this.idCategorie=(parseInt(event.target.value));
   this.getCategoryById(this.idCategorie);
  

}
selectCategorie(event:any){
this.idCategorie=parseInt(event.target.value);
this.sc.getCategory(this.idCategorie).subscribe(data=>{
  this.categorieProduit=data;  
  this.produitF=this.produits.filter(x=>x.categorie.nom.indexOf(this.categorieProduit.nom)!=-1)
});

 

  }




showDescription(): void {
  const description = document.getElementById("description");
  if (description !== null) {
    if (description.style.display === "none") {
      description.style.display = "block";
    } else {
      description.style.display = "none";
    }
  }
}


navigation() {
  this.router.navigate(['Panier/'+this.client.id])
}

}
