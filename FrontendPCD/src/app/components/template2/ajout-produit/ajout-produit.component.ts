
import { Component, ElementRef, Inject, OnInit } from '@angular/core';

import { CategorieService } from '../../../categorie.service';
import { Produit } from 'src/app/model/produit';
import { Categorie } from 'src/app/model/categorie';
import Swal from 'sweetalert2';
import { ProduitService } from '../../../produit.service';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Vendeur } from 'src/app/model/vendeur';
import { VendeurService } from 'src/app/vendeur.service';
import { v4 as uuidv4 } from 'uuid';
import { DescriptionService } from 'src/app/description.service';
import { Description } from 'src/app/model/description';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable!: ElementRef;
  img: string;
  categorieProduit: Categorie = new Categorie(0, "", { id: 0 });
  produit: Produit = new Produit("", "", 0, 0, "", this.categorieProduit, 0, { id: 0 });
  categories!: Categorie[];
  photo!: File;
  dat: any[] = [];
  vendeur: Vendeur;
  description: Description = new Description("", "", "", "", "", { id: "" });
  idCategorie: number;

  constructor(private service: ProduitService, private sc: CategorieService, private router: Router, private ds: DescriptionService,
    private vendeurservice: VendeurService,private dataservice : DataService) { }

  ngOnInit(): void {

    this.getCurrentVendeur();

  }
  getdata()
  {
    this.dataservice.getAllData().subscribe(data=>{
      for (let a of data) {
        if (a.product_nom == this.produit.nom)
         {this.dat.push({id : a.product_prix})}
      }
    })
  }
  getCurrentVendeur() {
    this.vendeurservice.getCurrentVendeur().subscribe(vendeur => { if (vendeur) this.vendeur = vendeur; console.log("le vendeur " + this.vendeur.nom + " est connecté"); this.getAllCategoriesByVendeur(this.vendeur.id); });
  }

  getAllCategoriesByVendeur(i: number) {
    this.sc.getAllCategoriesByVendeur(i).subscribe(data => { this.categories = data; this.categories = this.categories })
  }

  //selectionner une image a partir de votre bureau ,s'excecuter a l'appui pour ajouter une image de nouveau produit
  onPhotoSelected(event: any): void {
    this.photo = event.target.files[0];
    if (this.photo) {
      const reader = new FileReader();
      reader.readAsDataURL(this.photo);
      reader.onload = () => {
        this.img = reader.result as string;
      };
    }
  }

  // deselectionner la photo  apres l'ajout du produit
  resetPhoto() {
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.files);
  }

  // Vider le formulaire et recharger la liste des produits
  restProduit() {
    this.categorieProduit = new Categorie(0, "", { id: 0 });
    this.produit = new Produit("", "", 0, 0, "", this.categorieProduit, 0, { id: 0 });
  }
  //extraire la categorie selectionner a partir de la base de données
  selectCat(event: any) {

    this.idCategorie = (parseInt(event.target.value));
    this.getCategoryById(this.idCategorie);
    console.log('' + this.idCategorie);
  }

  getCategoryById(id: number) {
    this.sc.getCategory(id).subscribe(data => { this.categorieProduit = data });
  }



  addProduit(): void {
    console.log(this.photo)
    this.produit.id = uuidv4();
    this.getCategoryById(this.produit.categorie.id);
    this.produit.categorie = this.categorieProduit;
    this.produit.vendeur.id = this.vendeur.id;
    this.service.addProduit(this.produit, this.photo).subscribe(() => {
      this.description.product.id = this.produit.id;
      this.addDescription();
      //fenetre de notification : le produit a été ajouté avec succès.
      Swal.fire({
        //position: 'top-end',
        icon: 'success',
        title: 'le produit a été ajouté avec succès',
        showConfirmButton: false,
        timer: 1500
      })
      this.restProduit();
      this.resetPhoto();
      this.photo = new File([], '');
      // Charger la liste des produits
      // this.listeProduits = this.serviceProduit.getListeProduits();
    });
    this.router.navigate(['/template/' + this.vendeur.idTemplate + '/' + this.vendeur.id]);
  }
  //ajout Description
  addDescription(): void {
    this.description.id = uuidv4();
    console.log("" + this.description.product.id)
    this.ds.addDescription(this.description).subscribe(() => console.log(this.description))
  }


}