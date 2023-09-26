import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateContent } from 'src/app/model/template-content';
import { Vendeur } from 'src/app/model/vendeur';
import { TemplateContentService } from 'src/app/template-content.service';
import { VendeurService } from 'src/app/vendeur.service';
import { SweetAlertOptions } from 'sweetalert2';
import Swal from 'sweetalert2';
interface MySweetAlertOptions extends SweetAlertOptions {
  didOpen?: () => void;
  willClose?: () => void;
}
@Component({
  selector: 'app-home-vendeur3',
  templateUrl: './home-vendeur3.component.html',
  styleUrls: ['./home-vendeur3.component.css']
})
export class HomeVendeur3Component implements OnInit{
  templateContent:TemplateContent=new TemplateContent(0,"","","","",{id:0});
  isEditMode1 = false;
  isEditMode2 = false;
  isEditMode3 = false;
  vendeur:Vendeur;
  photo:File;
  img:string;
  
  constructor(private templateService:TemplateContentService, private http: HttpClient,private router: Router,private vendeurservice:VendeurService){}
   
  getCurrentVendeur(){
    this.vendeurservice.getCurrentVendeur().subscribe(vendeur => {if(vendeur) 
    this.vendeur=vendeur;console.log("le vendeur :"+this.vendeur.id+"est connecté")
    this.getTemplateByVendeur();});}
  ngOnInit(){
    this.BuildTemplate();
    this.getCurrentVendeur();
    
  }
  getTemplateByVendeur(){

    this.templateService.getTemplateByVendeur(this.vendeur.id).subscribe(data=>{
      if(data){
      this.templateContent=data;console.log("if")}
      else
      {this.templateContent.description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque vero eius ipsam incidunt illum totam nostrum quidem sit cumque fugit. Accusamus rem praesentium labore tempore ullam porro quaerat fugiat cum ipsum, sint perferendis "
      this.templateContent.text1="Les Meilleurs Produits";
      this.templateContent.text2="Achetez les produits les plus en vogue sur notre site"
      this.templateContent.vendeur.id=this.vendeur.id;  
      
          this.templateService.createTemplateContent(this.templateContent,this.photo).subscribe(()=>console.log(this.templateContent))
        }});
    
  }
  onPhotoSelected(event: any): void {
     
    this.photo =event.target.files[0];
     if (this.photo) {
       const reader = new FileReader();
       reader.readAsDataURL(this.photo);
       reader.onload = () => {
         this.img = reader.result as string;
         this.templateService.createTemplateContent(this.templateContent,this.photo).subscribe(()=>console.log(this.templateContent));
       };
     }
   }
   navigation1() {
    this.router.navigate(['/dashboard/'+this.vendeur.id])
  }
  
  enableEditMode1(): void {
    this.isEditMode1 = true;
  }
  
  cancelEditMode1(): void {
    this.isEditMode1 = false;
  }
  enableEditMode2(): void {
    this.isEditMode2 = true;
  }
  
  cancelEditMode2(): void {
    this.isEditMode2 = false;
  }
  enableEditMode3(): void {
    this.isEditMode3 = true;
  }
  
  cancelEditMode3(): void {
    this.isEditMode3 = false;
  }

  modifiertext1(newText: string) {
    
    this.templateContent.text1 = newText;
    this.templateService.updateTemplateContent(this.templateContent,this.photo).subscribe(()=>
      this.isEditMode1 = false
    );
  }
  modifiertext2(newText: string) {
    
    this.templateContent.text2 = newText;
    this.templateService.updateTemplateContent(this.templateContent,this.photo).subscribe(()=>
    this.isEditMode2 = false
  );
  }
  modifierDescription(newText: string) {
    
    this.templateContent.description = newText;
    this.templateService.updateTemplateContent(this.templateContent,this.photo).subscribe(()=>
    this.isEditMode3 = false
  );
  }
  navigation() {
    this.router.navigate(['/listeproduit3/'+this.vendeur.id]);
  }
  BuildTemplate() {
    let timerInterval: NodeJS.Timeout;
    let subWindow;
    const options: MySweetAlertOptions = {
      title: 'Template are building!',
      html: 'It will be ready in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer()?.querySelector('b');
        if (b !== null) {
          timerInterval = setInterval(() => {
            b!.textContent = Swal.getTimerLeft()?.toString() ?? null;
          }, 100);
        }},
      willClose: () => {
        clearInterval(timerInterval);
      }
    };
    Swal.fire(options).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });
  }
}
