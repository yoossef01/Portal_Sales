import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { ChoosetemplateComponent } from './components/choosetemplate/choosetemplate.component';
import { TemplateComponent } from './components/template/template.component';
import { ListeproduitsComponent } from './components/listeproduits/listeproduits.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './components/details/details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonToggleModule}from '@angular/material/button-toggle'; 
  
   import   {MatButtonModule,MatInputModule,MatRadioModule,MatDialogModule,MatCommonModule,MatSliderModule, MatAutocompleteModule,MatIconModule,
  MatCheckboxModule,MatSelectModule,MatFormFieldModule,MatSlideToggleModule,MatBadgeModule,} from '@angular/material'; 
 import  {CommonModule}  from '@angular/common'; 
 
   import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { Template1Component } from './components/template12/template1.component';
import { UpdateProductDialogComponent } from './components/update-product-dialog/update-product-dialog.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { LoginComponent } from './components/login/login.component';
import { Home2Component } from './components/template2/home2/home2.component';
import { AjoutProduitComponent } from './components/template2/ajout-produit/ajout-produit.component';
import { AjoutCategorieComponent } from './components/template2/ajout-categorie/ajout-categorie.component';
import { PanierComponent } from './components/panier/panier.component';
import { SignupVendeurComponent } from './components/signup-vendeur/signup-vendeur.component';
import { LoginVendeurComponent } from './components/login-vendeur/login-vendeur.component';
import { HomeclientComponent } from './components/template2/homeclient/homeclient.component';
import { AchatComponent } from './components/template2/achat/achat.component';
import { NgChartsModule } from 'ng2-charts';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { SideNavComponent } from './components/dashboard/side-nav/side-nav.component';
import { MainComponent } from './components/dashboard/main/main.component';
import { TopWidgetsComponent } from './components/dashboard/top-widgets/top-widgets.component';
import { SalesByMonthComponent } from './components/dashboard/sales-by-month/sales-by-month.component';
import { SalesByCategoryComponent } from './components/dashboard/sales-by-category/sales-by-category.component';
import { LastFewTransactionsComponent } from './components/dashboard/last-few-transactions/last-few-transactions.component';
import { TopThreeProductsComponent } from './components/dashboard/top-three-products/top-three-products.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { ChartModule } from 'angular-highcharts';
import { FormsModule } from '@angular/forms';

import { ComparateurComponent } from './components/comparateur/comparateur.component';

import { Home1Component } from './components/template1/home1/home1.component';
import { ListProductsComponent } from './components/template1/list-products/list-products.component';
import { ListProductsClientComponent } from './components/template1/list-products-client/list-products-client.component';
import { HomeVendeurComponent } from './components/template1/home-vendeur/home-vendeur.component';
import { EditProfilComponent } from './components/edit-profil/edit-profil.component';
import { ListProductsClient3Component } from './components/template3/list-products-client3/list-products-client3.component';
import { AdmindashComponent } from './components/admindash/admindash.component';
import { Home3Component } from './components/template3/home3/home3.component';
import { ListProductsVendeur3Component } from './components/template3/list-products-vendeur3/list-products-vendeur3.component';
import { DialogBox3Component } from './components/dialog-box3/dialog-box3.component';
import { UpdateProductDialog3Component } from './components/update-product-dialog3/update-product-dialog3.component';
import { HomeVendeur3Component } from './components/template3/home-vendeur3/home-vendeur3.component';
import { UpdateProduitComponent } from './components/template2/update-produit/update-produit.component';

const materiel=[
  MatAutocompleteModule, MatIconModule, MatButtonModule,
   MatFormFieldModule, MatInputModule, MatCommonModule,MatSlideToggleModule,
    MatRadioModule, MatBadgeModule,MatSliderModule,MatCheckboxModule,
   MatSelectModule ,MatDialogModule ,MatBadgeModule,MatButtonToggleModule]
@NgModule({
  declarations: [
    AppComponent,
   
    HomeComponent,
    ChoosetemplateComponent,
    TemplateComponent,
    ListeproduitsComponent,
        DetailsComponent,
      DialogBoxComponent,
      Template1Component,
      UpdateProductDialogComponent,
      
      InscriptionComponent,
      LoginComponent,
      Home2Component,
      AjoutProduitComponent,
      AjoutCategorieComponent,
      PanierComponent,
      SignupVendeurComponent,
      LoginVendeurComponent,
      HomeclientComponent,
      AchatComponent,
      HeaderComponent,
      SideNavComponent,
      MainComponent,
      TopWidgetsComponent,
      SalesByMonthComponent,
      SalesByCategoryComponent,
      LastFewTransactionsComponent,
      TopThreeProductsComponent,
      DashboardComponent,
      ComparateurComponent,
      Home1Component,
      ListProductsComponent,
      ListProductsClientComponent,
      EditProfilComponent,
      HomeVendeurComponent,
      ListProductsClient3Component,
              
              
      
      HomeVendeurComponent,
              AdmindashComponent,
              Home3Component,
              ListProductsVendeur3Component,
              DialogBox3Component,
              UpdateProductDialog3Component,
              HomeVendeur3Component,
              UpdateProduitComponent,
             

  ],
   schemas:[CUSTOM_ELEMENTS_SCHEMA]
,
   entryComponents:[DialogBoxComponent],
  imports: [BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,materiel,CommonModule,ReactiveFormsModule,
    NgChartsModule,
    ChartModule, 


    
  
    
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
