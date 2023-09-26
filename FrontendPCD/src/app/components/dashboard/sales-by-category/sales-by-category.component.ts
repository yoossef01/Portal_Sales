import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AchatService } from 'src/app/achat.service';
import { CategorieService } from 'src/app/categorie.service';
import { Achat } from 'src/app/model/achat';
import { Produit } from 'src/app/model/produit';
import { Vendeur } from 'src/app/model/vendeur';
import { ProduitService } from 'src/app/produit.service';
import { VendeurService } from 'src/app/vendeur.service';

@Component({
  selector: 'app-sales-by-category',
  templateUrl: './sales-by-category.component.html',
  styleUrls: ['./sales-by-category.component.scss']
})
export class SalesByCategoryComponent implements OnInit {

  nombreachat : any;
  totalerevenu : number;
  achat : Achat[];
  vendeur : Vendeur;
  produitF : Produit[];
  categories : string[];
  categorie : string[] ;
  data: any[] = [];
  chart: any;
  constructor(private achatService: AchatService, private vendeurservice : VendeurService, private service: ProduitService, private sc: CategorieService ,) { this.categories = [];
  this.categorie = []}

  ngOnInit(): void {
    this.getCurrentVendeur();
    
  }

  getCurrentVendeur(){
    this.vendeurservice.getCurrentVendeur().subscribe(vendeur =>
    {if(vendeur) this.vendeur=vendeur;
    this.service.getProductsByVendeur(this.vendeur.id).subscribe(data=>{this.produitF=data; this.getNombreAchat(this.vendeur.id)}    )});}


  getNombreAchat(i : number): void {

    this.achatService.getAchatByVendeur(i).subscribe(achats => { this.achat = achats;
      for (let a of achats) {
        this.categories.push(a.product.categorie.nom);
  
      }

      for (let value of new Set(this.categories)){
        this.categorie.push(value)
      }
        if (this.categorie) {
          for (let i = 0; i < this.categorie.length; i++) {
            this.data.push({
              name: this.categorie[i],
              y: this.countOccurrences(this.categorie[i], this.categories) / this.categories.length,
              color: this.getRandomColor()
            });
          }

        }

      this.createChart();

    })
  }







  createChart() {
  this.chart = new Chart({
    chart: {
      type: 'pie',
      height: 325
    },
    title: {
      text: 'Category wise sales'
    },
    xAxis: {
      categories: [
        'Electronics',
        'Groceries',
        'Cos',
        'Clothes',
        'Appliances',
      ]
    },
    yAxis: {
      title: {
        text: 'Revenue in %'
      }
    },
    series: [
     {
      type: 'pie',
      data: this.data
     }
    ],
    credits: {
      enabled: false
    }
  })

  }


  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  countOccurrences(str: string, list: string[]): number {
    let count = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i] === str) {
        count++;
      }
    }
    return count;
  }


}
