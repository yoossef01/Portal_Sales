import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/categorie.service';
import { Vendeur } from 'src/app/model/vendeur';
import { VendeurService } from 'src/app/vendeur.service';

@Component({
  selector: 'app-ajout-categorie',
  templateUrl: './ajout-categorie.component.html',
  styleUrls: ['./ajout-categorie.component.css']
})
export class AjoutCategorieComponent {
  nomNewCat!:string;
  newCategory: Categorie=new Categorie(0,"",{id:0})
  vendeur:Vendeur;
  constructor(private sc:CategorieService, private router: Router,private vendeurservice:VendeurService) {}
  ngOnInit(): void {
    this.getCurrentVendeur();}
   
  
  getCurrentVendeur(){
    this.vendeurservice.getCurrentVendeur().subscribe(vendeur => {if(vendeur) 
    this.vendeur=vendeur;console.log("le vendeur :"+this.vendeur.id+"est connecté")});}
  
    createNewCategory() {
    if (this.nomNewCat=='') {
        alert("Name cannot be empty.");
  
        return;
    }
    this.newCategory.nom = this.nomNewCat;
    this.newCategory.vendeur.id=this.vendeur.id;
    console.log(this.newCategory);

    this.sc.addCategorie(this.newCategory).subscribe(() => {
    
        this.nomNewCat = "";},);

        this.router.navigate(['/template/'+this.vendeur.idTemplate+'/'+this.vendeur.id])};
  }