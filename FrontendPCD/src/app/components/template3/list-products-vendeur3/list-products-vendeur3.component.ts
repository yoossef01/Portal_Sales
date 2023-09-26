import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/categorie.service';
import { ClientService } from 'src/app/client.service';
import { DescriptionService } from 'src/app/description.service';
import { Categorie } from 'src/app/model/categorie';
import { Client } from 'src/app/model/client';
import { Description } from 'src/app/model/description';
import { Produit } from 'src/app/model/produit';
import { Vendeur } from 'src/app/model/vendeur';
import { ProduitService } from 'src/app/produit.service';
import { VendeurService } from 'src/app/vendeur.service';
import { UpdateProductDialog3Component } from '../../update-product-dialog3/update-product-dialog3.component';
import Swal from 'sweetalert2';
import { DialogBox3Component } from '../../dialog-box3/dialog-box3.component';

@Component({
  selector: 'app-list-products-vendeur3',
  templateUrl: './list-products-vendeur3.component.html',
  styleUrls: ['./list-products-vendeur3.component.css']
})
export class ListProductsVendeur3Component implements OnInit {

  produits: Produit[]=[] ;
  
  produitF!:Produit[];
  nomNewCat:string;
  newCategory: Categorie=new Categorie(0,"",{id:0}); 
  categorieProduit:Categorie=new Categorie(0,"",{id:0}); 
  produit:Produit=new Produit("","",0,0,"",this.categorieProduit,0,{id:0}) ;
  produitModifie:Produit=new Produit("","",0,0,"",this.categorieProduit,0,{id:0}) ;
  idCategorie:number;
  categories:Categorie[]=[];
  categorie: Categorie;
  photo:File;
  vendeur:Vendeur=new Vendeur(0,0,"","","","","","","");
  selectedCategoryId: number;
  isEditMode = false;
  descriptions: {[key: string]: Description} = {};
  texte:string;
constructor(private sc:CategorieService,private service:ProduitService,public dialog:MatDialog,
  private vendeurservice:VendeurService, private router:Router,private ds:DescriptionService){}
  getCurrentVendeur(){
    this.vendeurservice.getCurrentVendeur().subscribe(vendeur =>
    {if(vendeur) this.vendeur=vendeur;console.log("le vendeur "+this.vendeur.id+" est connecté")
    //affichage de liste de produit de currentVendeur
    this.getAllProducts(this.vendeur.id); this.getAllcategorie(this.vendeur.id) });}
  
  ngOnInit(): void {
    this.getCurrentVendeur();
    this.ds.getAllDescriptions().subscribe((descriptions: Description[]) => {
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

  getAllProducts(i:number){this.service.getProductsByVendeur(i).subscribe(data=>{this.produitF=data;this.produits=this.produitF;} )}
  getAllcategorie(i : number)
  {
    this.sc.getAllCategoriesByVendeur(i).subscribe(data=>{this.categories=data; this.categories=this.categories
    })
  }
  
  navigation() {
    this.router.navigate(['/template/1/'+this.vendeur.id]);
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

createNewCategory() {
  if (this.nomNewCat=='') {
      alert("Name cannot be empty.");

      return;
  }
  
  this.newCategory.nom = this.nomNewCat;
  this.newCategory.vendeur.id=this.vendeur.id;
  console.log(this.newCategory);
 
  this.sc.addCategorie(this.newCategory).subscribe(() => {
          this.nomNewCat = "";
          this.getAllcategorie(this.vendeur.id)},);

}

modifierCategorie(id:number ,nom:string): void {
  const cat :Categorie={id:id ,nom:nom,vendeur: {id:this.vendeur.id}}
  this.sc.modifierCategorie(id, cat)
    .subscribe(cat => this.categorie = cat);
}

enableEditMode(id: number): void {
  this.isEditMode = true;
}

cancelEditMode(): void {
  this.isEditMode = false;
}
openDialog(){
  let dialogRef = this.dialog.open(DialogBox3Component, {
    width: '700px'
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.getAllProducts(this.vendeur.id); // récupérer la liste des produits après avoir fermé la dialog box
  });
  }
  
  openDialogUpdate(id:string){
  let dialogRef = this.dialog.open(UpdateProductDialog3Component, {
    width: '700px',
    data: {id}
    
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.getAllProducts(this.vendeur.id); // récupérer la liste des produits après avoir fermé la dialog box
  });
  }





getDescription(id: string): string {
  return this.descriptions[id]?.shortDescription || '';
}
}
