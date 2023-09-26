import { Component, OnInit } from '@angular/core';
import { AchatService } from 'src/app/achat.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  main= 'main';
  editProfil= 'edit';
  achat= 'achat';
  

  

  constructor(private achatservice:AchatService) { }

  ngOnInit(): void {
  }
  PageMain() {
    this.achatservice.Page = this.main;console.log("this.achatservice.Page")
  }
  PageEdit() {
    this.achatservice.Page = this.editProfil;
  }
  PageAchat() {
    this.achatservice.Page = this.achat;
  }
}
