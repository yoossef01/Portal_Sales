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
  selector: 'app-sales-by-month',
  templateUrl: './sales-by-month.component.html',
  styleUrls: ['./sales-by-month.component.scss']
})
export class SalesByMonthComponent implements OnInit {




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


    getNombreAchat(i: number): void {
      this.achatService.getAchatByVendeur(i).subscribe(achats => {
        let achatsParMois = new Map<number, number>();
        for (let a of achats) {
          const dateObj = new Date(a.date);

          const month = dateObj.getMonth() + 1;

          let nbAchats = achatsParMois.get(month) || 0;
          achatsParMois.set(month, nbAchats + a.montant);
        }

        for (let i = 1; i <= 12; i++) {
        this.data.push(achatsParMois.get(i) || 0);
        }

         this.createChart();
      });
    }






    createChart() {

  this.chart = new Chart({
    chart: {
      type: 'line',
      height: 325
    },
    title: {
      text: 'Month wise sales'
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },
    yAxis: {
      title: {
        text: 'Revenue in DT'
      }
    },
    series: [
      {
        name: "Tunisie",
        type: "line",
        color: '#044342',
        data: this.data
      },
      
    ],
    credits: {
      enabled: false
    }
  })



}
  
}
