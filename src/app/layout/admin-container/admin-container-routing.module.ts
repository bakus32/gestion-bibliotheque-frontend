import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuteursComponent } from './auteurs/auteurs.component';
import { CategorieComponent } from './categorie/categorie.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { LivresComponent } from './livres/livres.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';

const routes: Routes = [
  { path: "", redirectTo: "/administration/dashbord", pathMatch: "full" },
 
  {
    path: "utilisateurs",
    component: UtilisateursComponent
  },
  {
    path: "dashbord",
    component: DashbordComponent
  },
  {
    path: "categories",
    component: CategorieComponent
  },
  {
    path: "livres",
    component: LivresComponent
  },
  {
    path: "auteurs",
    component: AuteursComponent
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
