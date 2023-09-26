
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
import { SweetAlertOptions } from 'sweetalert2';

interface MySweetAlertOptions extends SweetAlertOptions {
  didOpen?: () => void;
  willClose?: () => void;
}

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})

export class Home2Component implements OnInit {



  produits: Produit[]=[] ;
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
  categories:Categorie[]=[];
  photo:File;
  vendeur:Vendeur=new Vendeur(0,0,"","","","","","","");
  
  
  set texte(ch:string)
  {
 this.produitF=this.filtrer(ch);
  }
  filtrer(mot:string)
  {
   return this.produits.filter(x=>x.nom.indexOf(mot)!=-1)
  }
   constructor(private service:ProduitService,private sc:CategorieService, private router:Router,
    public dialog:MatDialog,private vendeurservice:VendeurService ) { }
  getCurrentVendeur(){
    this.vendeurservice.getCurrentVendeur().subscribe(vendeur =>
    {if(vendeur) this.vendeur=vendeur;console.log("le vendeur "+this.vendeur.nom+" est connecté")
    //affichage de liste de produit de currentVendeur
    this.service.getProductsByVendeur(this.vendeur.id).subscribe(data=>{this.produitF=data; this.getcategoriie(this.vendeur.id)}    )});}
  
  ngOnInit(): void {
    this.BuildTemplate();

    this.getCurrentVendeur();

 
  }


  getcategoriie(i : number)
  {
    this.sc.getAllCategoriesByVendeur(i).subscribe(data=>{this.categories=data; this.categories=this.categories
    console.log(data)})
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
   });
}

 
 onPhotoSelected(event: any) {
  this.photo = event.target.files[0];
}
 updateProduit(): void {
   this.getCategoryById(this.idCategorie);
   this.produit.categorie=this.categorieProduit;
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
//affichage de priduit selon la categorie selectionnée
selectCategorie(event:any){
  this.idCategorie=parseInt(event.target.value);
  this.sc.getCategory(this.idCategorie).subscribe(data=>{this.categorieProduit=data; 
  this.produitF=this.produits.filter(x=>x.categorie.nom.indexOf(this.categorieProduit.nom)!=-1)});
   }

createNewCategory() {
  if (this.nomNewCat=='') {
      alert("Name cannot be empty.");

      return;
  }
  this.newCategory.nom = this.nomNewCat;
  this.newCategory.vendeur.id=this.vendeur.id;
  console.log(this.newCategory);
 
 

  this.sc.addCategorie(this.newCategory).subscribe(() => {
       this.catadded=true;
          this.nomNewCat = "";},);

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
BuildTemplate() {
  let timerInterval: NodeJS.Timeout;
  let subWindow;
  const options: MySweetAlertOptions = {
    title: 'Template are building!',
    html: 'It will be ready in <b></b> milliseconds.',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer()?.querySelector('b');
      if (b !== null) {
        timerInterval = setInterval(() => {
          b!.textContent = Swal.getTimerLeft()?.toString() ?? null;
        }, 100);
      }},
    willClose: () => {
      clearInterval(timerInterval);
    }
  };
  Swal.fire(options).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer');
    }
  });
}

logout() {
  this.vendeurservice.logout().subscribe(() =>{
  localStorage.removeItem('token');
  this.router.navigate(['/home'])}
  )
}

navigation() {
  this.router.navigate(['/dashboard/'+this.vendeur.id])
}

navigation1() {
  this.router.navigate(['/achat/'+this.vendeur.id])
}

update(id :string) {
  this.router.navigate(['/template2updateproduit/'+ id])
}

}
