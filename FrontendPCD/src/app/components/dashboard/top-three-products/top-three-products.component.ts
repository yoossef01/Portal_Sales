import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AchatService } from 'src/app/achat.service';
import { CategorieService } from 'src/app/categorie.service';
import { Achat } from 'src/app/model/achat';
import { Produit } from 'src/app/model/produit';
import { Vendeur } from 'src/app/model/vendeur';
import { ProduitService } from 'src/app/produit.service';
import { VendeurService } from 'src/app/vendeur.service';


@Component({
  selector: 'app-top-three-products',
  templateUrl: './top-three-products.component.html',
  styleUrls: ['./top-three-products.component.scss']
})
export class TopThreeProductsComponent {





  nombreachat : any;
  totalerevenu : number;
  achat : Achat[];
  vendeur : Vendeur;
  produitF : Produit[];
  categories : string[];
  categorie : string[] ;
  data: any[] = [];
  keys: any[] = [];
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
      let achatsParNom = new Map<string, number>();
      for (let a of achats) {
        let qteAchat = achatsParNom.get(a.nom) || 0;
        achatsParNom.set(a.nom, qteAchat + a.quantite);
      }

    let entries = Array.from(achatsParNom.entries());
    entries.sort((a, b) => b[1] - a[1]);
    let achatsTries = new Map<string, number>();
    for (let [nom, qte] of entries) {
      achatsTries.set(nom, qte);
    }

    this.keys = Array.from(achatsTries.keys());
    let values = Array.from(achatsTries.values());
    for (let i = 0; i < 3 ; i++){

      this.data.push({
        name: this.keys[i],
        y: values[i],
        color: this.getRandomColor()
      });

    }

    this.createChart();

    })
  }










createChart() {
  this.chart = new Chart({
    chart: {
      type: 'bar',
      height: 225
    },
    title: {
      text: 'Top 3 Products'
    },
    xAxis: {
      categories: this.keys
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    series: [
     {
      type: 'bar',
      showInLegend: false,
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




}
