import { Component,OnInit } from '@angular/core';
import { AchatService } from 'src/app/achat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  main= 'main';
  editProfil= 'edit';
  achat= 'achat';
  
constructor(public as:AchatService){}
 ngOnInit(): void {
     this.as.Page=this.editProfil;
 }
}
