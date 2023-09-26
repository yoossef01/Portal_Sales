import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/app/model/client';
import { Vendeur } from 'src/app/model/vendeur';
import { TemplateserviceService } from 'src/app/templateservice.service';
import { VendeurService } from 'src/app/vendeur.service';

@Component({
  selector: 'app-choosetemplate',
  templateUrl: './choosetemplate.component.html',
  styleUrls: ['./choosetemplate.component.css']
})
export class ChoosetemplateComponent implements OnInit {
  
  currentVendeurId: number;
  currentSeller: Vendeur;
  v:Vendeur;


  constructor(private route:Router,public numtemplate:TemplateserviceService,public vendeurservice:VendeurService) { }

  ngOnInit(): void {
   this.vendeurservice.build=true;
    this.getCurrentVendeur();
  }

  getCurrentVendeur(){
    this.vendeurservice.getCurrentVendeur().subscribe(vendeur => {if(vendeur) 
      {this.v=vendeur;console.log("le vendeur: "+this.v.id+" est connecté")}
      else console.log("nest pas connecté")}
    );
  }
  
firstchoice(){
  this.v.idTemplate=1;
  this.vendeurservice.UpdateVendeur(this.v).subscribe(data=>{this.v=data;console.log(this.v)})
  this.route.navigateByUrl('/template/1/'+this.v.id);
}
secondchoice(){
  
    this.v.idTemplate=2;
   this.vendeurservice.UpdateVendeur(this.v).subscribe(data=>{this.v=data;console.log(this.v)})
  this.route.navigateByUrl('/template/2/'+this.v.id);
}
thirdchoice(){
  this.v.idTemplate=3;
  this.vendeurservice.UpdateVendeur(this.v).subscribe(data=>{this.v=data;console.log(this.v)})
 this.route.navigateByUrl('/template/3/'+this.v.id);
}
}
