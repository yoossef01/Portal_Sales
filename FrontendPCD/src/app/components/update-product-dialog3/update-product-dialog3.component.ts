import { Component, ElementRef, OnInit,Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CategorieService } from 'src/app/categorie.service';
import { DescriptionService } from 'src/app/description.service';
import { Categorie } from 'src/app/model/categorie';
import { Description } from 'src/app/model/description';

import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';

@Component({
  selector: 'app-update-product-dialog3',
  templateUrl: './update-product-dialog3.component.html',
  styleUrls: ['./update-product-dialog3.component.css']
})
export class UpdateProductDialog3Component implements OnInit {
  prod!:Produit;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
   id:number;
   img:string;
    categories!:Categorie[];
   
    categorie: Categorie  =new Categorie(0,"",{id:0}); 
    description:Description=new Description("","","","","",{id:""});

    photo:File;
  constructor(public dialogRef: MatDialogRef<UpdateProductDialog3Component>,
    @Inject(MAT_DIALOG_DATA) public data:any,private service:ProduitService,
    private sc:CategorieService,private ar:ActivatedRoute,private ds:DescriptionService,) { }

  ngOnInit(): void { this.sc.getAllCategories().subscribe(data=>{this.categories=data; this.categories=this.categories})
  this.service.getProduct(this.data.id).subscribe(data =>{this.prod=data;
  this.ds.getDescription(this.prod.id).subscribe(data=>this.description=data)});
  
  console.log(this.prod);
  }
  getCategoryById(id:number){
    this.sc.getCategory(id).subscribe(data=>{this.categorie=data; this.prod.categorie=this.categorie;
      });
   
  }

   
  
  onPhotoSelected(event: any): void {
     
    this.photo =event.target.files[0];
     if (this.photo) {
       const reader = new FileReader();
       reader.readAsDataURL(this.photo);
       reader.onload = () => {
         this.img = reader.result as string;
       };
     }
   }
  reset() {
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.files);
}
  selectCat(event:any){

    this.id=(parseInt(event.target.value));
    this.getCategoryById(this.id);
   
 
 }
 
 updateProduit(): void {
  this.getCategoryById(this.id);

  
 
   
this.service.updateProduct(this.photo,this.prod).subscribe(
   response => {
     console.log(response);
     //console.log(JSON.stringify(this.newProduit));
     console.log(this.prod);
     
     // Vider le formulaire et recharger la liste des produits
     this.prod = new Produit("","",0,0,"",this.categorie,0,{id:0}) ;


     // Charger la liste des produits
     // this.listeProduits = this.serviceProduit.getListeProduits();
   },
  
 );
}

  onCancel(): void {
    this.dialogRef.close();
  }
}



