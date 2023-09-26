import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendeurService } from 'src/app/vendeur.service';

@Component({
  selector: 'app-login-vendeur',
  templateUrl: './login-vendeur.component.html',
  styleUrls: ['./login-vendeur.component.css']
})
export class LoginVendeurComponent {model: any = {};
  
  
 

constructor(
  private router: Router, private vendeurservice:VendeurService
 
) {}


loginUser() {

  var vendeur = this.model.email;
  var password = this.model.password;
  

   
  this.vendeurservice.login(vendeur, password).subscribe((res : any) => {
      console.log("vendeur connecté");
      console.log('res',res)
      localStorage.setItem('token',res.token)
      this.vendeurservice.isLoggedIn.next(true);

      this.vendeurservice.getVendeurByEmail(vendeur).subscribe(data=>{
      const NumTemplate :number=data.idTemplate;console.log("0"+NumTemplate);
      const idvendeur : number=data.id
      this.router.navigate(['/template/'+NumTemplate+'/'+idvendeur]) })},
      (error: HttpErrorResponse) => {
      alert("invalid user");
      console.log(error);})
     }

}
