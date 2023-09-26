import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AchatService } from 'src/app/achat.service';
import { ClientService } from 'src/app/client.service';
import { CommandeService } from 'src/app/commande.service';
import { Achat } from 'src/app/model/achat';
import { Categorie } from 'src/app/model/categorie';
import { Client } from 'src/app/model/client';
import { Commande } from 'src/app/model/commande';
import { Produit } from 'src/app/model/produit';
import { Vendeur } from 'src/app/model/vendeur';
import { VendeurService } from 'src/app/vendeur.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit{
  commandes:Commande[] = [];;
  achats : Achat[]=[];
  vendeur! : Vendeur;
  categorieProduit:Categorie=new Categorie(0,"",{id:0}); 
  produit:Produit=new Produit("","",0,0,"",this.categorieProduit,0,{id:0}) ;
  achat: Achat = new Achat(10, new Date(), 0, '', 0, this.produit,{id:0},{id:0});
  client!:Client;
  somme:number=0;
  order:boolean=false;
  constructor(private cs:CommandeService, private achatservice: AchatService,private clientservice:ClientService, private router: Router,private vendeurservice: VendeurService){}
  ngOnInit(): void {
    this.getCurrentClient()};
   
  
  getCurrentClient(){
    this.clientservice.getCurrentClient().subscribe(client =>
    {if(client) this.client=client;console.log("le client "+this.client.id+" est connecté");
  this.getAllCommandes(this.client.id); })

  }
  getCommandes(){      this.cs.getAllCommandes().subscribe(data=>{this.commandes= data;
    for (let a of data){
      console.log(a.product.vendeur)
    }  });
}
  
  getAllCommandes(idClient:number){  
     return   this.cs.getCommandesByClient(idClient).subscribe(data=>{this.commandes= data;});
   }
  
  //calculer le montant des commandes
  getSomme(): number {
    let somme = 0;
    for (let commande of this.commandes) {
      somme += commande.montant;
    }
    return somme;
  }
  
  UpdateMontantTotal(c:Commande):void{
    c.montant=c.product.prix*c.quantite;
    this.cs.updateCommande(c).subscribe(data =>{c=data;console.log(c);} );
  }

  decrementQuantity(c: Commande) {
    if (c.quantite > 0) {
      c.quantite--;
      this.UpdateMontantTotal(c);
    }
  }
  
  incrementQuantity(c: Commande) {
    c.quantite++;
    this.UpdateMontantTotal(c);
  }
  
  DeleteCommande(id: number) {
   const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false})
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
        this.cs.deleteCommande(id).subscribe(
          data => {
            console.log(data);
            this.getAllCommandes(this.client.id);
  
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

navigate(){
  this.router.navigate(['templateclient/'+this.vendeurservice.getIdTemplate()+'/'+this.vendeurservice.getIdVendeur()])

}
  addAchat(): void {
  for(let com of this.commandes){
  this.achat.nom=com.nom;
  this.achat.montant=com.montant;
  this.achat.date=new Date();
  this.achat.quantite=com.quantite;
  this.achat.product.id=com.product.id;
  console.log(com.product.vendeur.id);
  this.achat.vendeur.id=com.product.vendeur.id;
  console.log(this.achat);
  this.achat.client.id = this.client.id;
   this.achatservice.saveAchat(this.achat).subscribe(data => console.log(data));
   
   this.cs.deleteCommande(com.id).subscribe(
    data => {this.order=true;this.getAllCommandes(this.client.id);
      console.log(data);})
}
}


}
