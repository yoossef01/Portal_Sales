import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vendeur } from 'src/app/model/vendeur';
import { VendeurService } from 'src/app/vendeur.service';
@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent  implements OnInit {




  searchText: string;

  vendeur : Vendeur[];

  constructor(private vendeurservice : VendeurService,
    private router: Router) { }

  ngOnInit(): void {

    this.getAllVendeur();
  }

  private getAllVendeur(){
    this.vendeurservice.getAllVendeurs().subscribe(data => { this.vendeur = data; 
    });
  }

  DeleteVendeur(id : number) {
    this.vendeurservice.DeleteVendeur(id).subscribe(data => {
      this.getAllVendeur();
    })
  }

}
