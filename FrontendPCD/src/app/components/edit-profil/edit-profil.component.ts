import { Component, OnInit } from '@angular/core';
import { Vendeur } from 'src/app/model/vendeur';
import { VendeurService } from 'src/app/vendeur.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit{
  v:Vendeur=new Vendeur(0,0,"","","","","","","");
  constructor(public vendeurservice:VendeurService) { }
  ngOnInit(): void {
   
    this.getCurrentVendeur();
  }

  getCurrentVendeur(){
    this.vendeurservice.getCurrentVendeur().subscribe(vendeur => {if(vendeur) 
      {this.v=vendeur;console.log("le vendeur: "+this.v.id+" est connecté")}
      else console.log("nest pas connecté")}
    );
  }
  update(){
this.v.nomboutique="ZEN";
    this.vendeurservice.UpdateVendeur(this.v).subscribe(data=>{this.v=data;console.log(this.v)})
  }
}
