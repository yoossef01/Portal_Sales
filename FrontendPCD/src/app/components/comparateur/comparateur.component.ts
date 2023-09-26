import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { ClientService } from 'src/app/client.service';
import { DescriptionService } from 'src/app/description.service';
import { Client } from 'src/app/model/client';
import { Description } from 'src/app/model/description';
import { ProductToCompare } from 'src/app/model/product-to-compare';
import { Produit } from 'src/app/model/produit';
import { Vendeur } from 'src/app/model/vendeur';
import { ProductToCompareService } from 'src/app/product-to-compare.service';
import { ProduitService } from 'src/app/produit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comparateur',
  templateUrl: './comparateur.component.html',
  styleUrls: ['./comparateur.component.css']
})
export class ComparateurComponent implements OnInit{
  
  comparisonResults: boolean=false;
 
  produitsComapred:ProductToCompare[]=[];
  listeDeListes: ProductToCompare[][] = [];
  productDescriptions: Description[]=[];
  selectedProducts:ProductToCompare[]=[];
  DescriptionOfSelectedProducts:Description[]=[];

  vendeur:Vendeur;
  client:Client;
  constructor(private produitService: ProduitService, private descriptionService:DescriptionService,
    private pc:ProductToCompareService,private clientservice:ClientService) {}
  ngOnInit(): void {
    this.getCurrentProductToCompareClient()
  
   
     
    
  }
  getCurrentProductToCompareClient(){
    this.clientservice.getCurrentClient().subscribe(client => {
      if(client) {
          this.client = client;
          console.log("le client " + this.client.id + " est connecté");
          this.pc.getProductToComparesByClient(this.client.id).subscribe(data => {
              this.produitsComapred = data;
              
              for (let i = 0; i < this.produitsComapred.length; i += 3) {
                  this.listeDeListes.push(this.produitsComapred.slice(i, i + 3));
              }
              console.log(this.listeDeListes);
          });
      }
  });
}

  compare(): void {
    console.log(this.listeDeListes);
    this.comparisonResults = true;
    console.log(this.productDescriptions);
  }
  selectProduct(product: ProductToCompare): void {
    if (this.selectedProducts.length < 3) {
      const index = this.produitsComapred.findIndex(p => p.product.id === product.product.id);
      if (index !== -1) {
        if (this.selectedProducts.length == 0) {
          this.selectedProducts.push(product);
                    
          // Ajouter le premier produit sélectionné
        } else if (this.selectedProducts.length == 1) {
          this.selectedProducts.push(product);          
          // Ajouter le deuxième produit sélectionné
        } else {
          this.selectedProducts[0] = this.selectedProducts[1]; // Le premier produit prend la place du deuxième
          this.selectedProducts[1] = product; // Ajouter le troisième produit sélectionné
        }
      }
    }
    this.DescriptionOfSelectedProducts = [];

    for (let i=0; i<this.selectedProducts.length; i++) {
      const product = this.selectedProducts[i];
      this.descriptionService.getDescriptionByProduct(product.product.id).subscribe(data => {
        this.DescriptionOfSelectedProducts.push(data);console.log( this.DescriptionOfSelectedProducts)
      });
    }
  }
  deleteProduct(p:ProductToCompare){
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
          this.pc.deleteProductToCompare(p.id).subscribe(()=>
          {this.produitsComapred.splice(this.produitsComapred.indexOf(p),1);
            for (let i = 0; i < this.listeDeListes.length; i++) {
              const subList = this.listeDeListes[i];
              const index = subList.indexOf(p);
              if (index !== -1) {
                subList.splice(index, 1);
                break;
              }
              
            }
            while (this.listeDeListes.length > 0 && this.listeDeListes[this.listeDeListes.length - 1].length < 3) {
              this.listeDeListes.pop();
            }
            
            for (let i = 0; i < this.produitsComapred.length; i += 3) {
              this.listeDeListes.push(this.produitsComapred.slice(i, i + 3));
            }
            
            if (this.listeDeListes.length === 0) {
              this.listeDeListes.push([]);
            }
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
}
}
