import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendeurService } from 'src/app/vendeur.service';

@Component({
  selector: 'app-home3',
  templateUrl: './home3.component.html',
  styleUrls: ['./home3.component.scss']
})
export class Home3Component {
  constructor (private router: Router, private servicevendeur:VendeurService) {}

  navigation() {
    this.router.navigate(['/listeproduitclient3/'+this.servicevendeur.getIdVendeur()]);
  }


}
