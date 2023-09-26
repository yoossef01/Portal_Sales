import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChoosetemplateComponent } from './components/choosetemplate/choosetemplate.component';
import { HomeComponent } from './components/home/home.component';




import { TemplateComponent } from './components/template/template.component';
import { ListeproduitsComponent } from './components/listeproduits/listeproduits.component';
import { DetailsComponent } from './components/details/details.component';
import { Template1Component } from './components/template12/template1.component';
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

import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { ComparateurComponent } from './components/comparateur/comparateur.component';
import { Home1Component } from './components/template1/home1/home1.component';
import { ListProductsComponent } from './components/template1/list-products/list-products.component';
import { ListProductsClientComponent } from './components/template1/list-products-client/list-products-client.component';
import { HomeVendeurComponent } from './components/template1/home-vendeur/home-vendeur.component';
import { ListProductsClient3Component } from './components/template3/list-products-client3/list-products-client3.component';
import { AdmindashComponent } from './components/admindash/admindash.component';
import { Home3Component } from './components/template3/home3/home3.component';
import { ListProductsVendeur3Component } from './components/template3/list-products-vendeur3/list-products-vendeur3.component';
import { HomeVendeur3Component } from './components/template3/home-vendeur3/home-vendeur3.component';
import { UpdateProduitComponent } from './components/template2/update-produit/update-produit.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: "products/:id", component: DetailsComponent },
  { path: 'choose', component: ChoosetemplateComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'liste', component: ListeproduitsComponent },
  { path: 'template12', component: Template1Component },
  { path: 'insc', component: InscriptionComponent },
  { path: 'signupVendeur', component: SignupVendeurComponent },
  { path: 'loginVendeur', component: LoginVendeurComponent },
  { path: 'Panier/:id', component: PanierComponent },
  { path: 'loginClient', component: LoginComponent },

  //template2
  { path: 'template/2/:id', component: Home2Component },
  { path: 'templateclient/2/:id', component: HomeclientComponent },
  { path: 'template2ajoutproduit', component: AjoutProduitComponent },
  { path: 'template2ajoutcategorie', component: AjoutCategorieComponent },
  { path: 'template2updateproduit/:id', component: UpdateProduitComponent },

  //template1
  { path: 'template/1/:id', component: HomeVendeurComponent },
  { path: 'templateclient/1/:id', component: Home1Component },
  { path: 'listeproduit1/:id', component: ListProductsComponent },
  { path: 'listeproduitclient1/:id', component: ListProductsClientComponent },

  //template3
  { path: 'template/3/:id', component: HomeVendeur3Component },
  { path: 'templateclient/3/:id', component: Home3Component },
  { path: 'listeproduit3/:id', component: ListProductsVendeur3Component },
  { path: 'listeproduitclient3/:id', component: ListProductsClient3Component },



  //************************************* */
  { path: 'achat/:id', component: AchatComponent },
  { path: 'dashboard/:id', component: DashboardComponent },
  { path: 'comparateur', component: ComparateurComponent },
  { path: 'admin', component: AdmindashComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
