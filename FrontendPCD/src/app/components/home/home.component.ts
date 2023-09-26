import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Vendeur } from 'src/app/model/vendeur';
import { VendeurService } from 'src/app/vendeur.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

vendeurs:Vendeur[]=[];
vendeur:Vendeur;
recherche:string;
selectedBoutique: string;

constructor(private vendeurService:VendeurService, private router:Router,private elementRef:ElementRef) { }
  
  

  ngOnInit(): void {
    this.vendeurService.getAllVendeurs().subscribe(data=>{this.vendeurs=data;console.log(this.vendeurs)})
  }
public rechercher():void{
  this.vendeurService.recherche=this.recherche;
  console.log(this.vendeurService.recherche);
}
onBoutiqueSelected(boutique: any) {
    this.selectedBoutique = boutique.nomboutique;
    this.getVendeurByNomboutique(this.selectedBoutique)
  }
getVendeurByNomboutique(nomboutique : string) {
  this.vendeurService.getVendeurByNomboutique(nomboutique).subscribe(data=>{this.vendeur=data
  
    this.router.navigate(['templateclient/'+data.idTemplate+'/'+data.id]);

  })
}
scrollToService() {
  const element = this.elementRef.nativeElement.querySelector('#services');
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

}
