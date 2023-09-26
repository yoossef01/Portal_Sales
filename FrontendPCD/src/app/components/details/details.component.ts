import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import {CommandeService  } from 'src/app/commande.service';
import { CategorieService } from 'src/app/categorie.service';
import { Commande } from 'src/app/model/commande';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from 'src/app/produit.service';
import { v4 as uuidv4 } from 'uuid';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/app/model/client';
import Swal from 'sweetalert2';
import { TemplateContentService } from 'src/app/template-content.service';
import { DescriptionService } from 'src/app/description.service';
import { Description } from 'src/app/model/description';
import { VendeurService } from 'src/app/vendeur.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
quantity:number;
  
  constructor(private ar:ActivatedRoute, private service:ProduitService,
    private commandeService:CommandeService,private clientservice :ClientService,
    private descriptionService:DescriptionService, private router:Router,
    private vendeurService: VendeurService
    ) { }
  categorieProduit:Categorie=new Categorie(0,"",{id:0}); 
  produit:Produit=new Produit("","",0,0,"",this.categorieProduit,0,{id:0}) ;
  description:Description=new Description("","","","","",{id:""});
  commandes:Commande[]=[];
  commande: Commande = new Commande(10, "", 0, new Date(), 0, this.produit, { id: 0 });
  c :Client;

  ngOnInit(): void {
   //ce code sert a extraire l'id de produit a partir de l'URL et l'affecter à un objet produit
    let id=this.ar.snapshot.paramMap.get('id');
    console.log(id);
    this.service.getProduct(id!).subscribe(data =>{this.produit=data;
    this.descriptionService.getDescriptionByProduct(this.produit.id).subscribe(data=>this.description=data);
    }) 
    
    this.getCurrentClient() };
    
 
     //connaitre le client connecté ,on l'a besoin pour créer les nouveaux commandes
  getCurrentClient(){
    this.clientservice.getCurrentClient().subscribe(client =>
      {if(client) this.c=client;console.log("le client: "+this.c.id+" est connecté");       });}
       
    
  addCommande() {
    
    if(this.produit.quantite>this.commande.quantite){
    this.commande.nom=this.produit.nom;
    this.commande.montant=this.produit.prix*this.commande.quantite;
    this.produit.quantite=this.produit.quantite-this.commande.quantite;
    this.commande.date=new Date();
    this.commande.product.id=this.produit.id;
    this.commande.client.id=this.c.id;
    this.service.saveP(this.produit).subscribe(data=>{this.produit=data;console.log(this.commande);
      this.commandeService.addCommande(this.commande)
        .subscribe(data => console.log(data));})}
        
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La quantité demandée est supérieure au stock disponible!',
            footer: 'Quantité currente est '+this.produit.quantite
          })
        }
        this.router.navigate(['templateclient/'+this.vendeurService.getIdTemplate()+'/'+this.vendeurService.getIdVendeur()])
      }
    
    decrementQuantity() {
      if (this.commande.quantite > 0) {
        this.commande.quantite--;
        let id=this.ar.snapshot.paramMap.get('id');
        console.log(id)
        this.service.getProduct(id!).subscribe(data =>this.produit=data)} }
     
    
    
    incrementQuantity() {
      this.commande.quantite++;
      let id=this.ar.snapshot.paramMap.get('id');
      console.log(id)
      this.service.getProduct(id!).subscribe(data =>this.produit=data)    }

  

}
    