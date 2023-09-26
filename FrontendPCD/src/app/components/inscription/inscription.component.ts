import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/client.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit{

  constructor(private service: ClientService, private router: Router) { }
  
  ngOnInit(): void {}
  data: any
  form = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    adresse : new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })


  submitClient(){
    this.data = this.form.value
    console.log(this.data)
    this.service.adduser(this.data).subscribe(data => {
    console.log(data) })
    this.router.navigate(['/loginClient']);}
  

}
