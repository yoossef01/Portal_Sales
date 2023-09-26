import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: any = {};
  
  constructor(private router: Router, private clientservice: ClientService){}
 
  loginUser() {
    var client = this.model.email;
    var password = this.model.password;
    
    this.clientservice.login(client, password).subscribe((res : any) => {
        console.log("client connecté");
        console.log('res',res)
        localStorage.setItem('token',res.token)
        this.router.navigate(['/home']) },
        (error: HttpErrorResponse) => {
        alert("invalid user");
        console.log(error); } )}
  
}





