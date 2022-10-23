import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './admin-container.component';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LayoutRoutingModule } from './admin-container-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgBusyModule } from 'ng-busy';
import { DashbordComponent } from './dashbord/dashbord.component';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgSelect2Module } from 'ng-select2';
import { AuteursComponent } from './auteurs/auteurs.component';
import { CategorieComponent } from './categorie/categorie.component';
import { LivresComponent } from './livres/livres.component';


@NgModule({
  declarations: [
    LayoutComponent,
    UtilisateursComponent,
    DashbordComponent,
    AuteursComponent,
    CategorieComponent,
    LivresComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    LayoutRoutingModule,
    NgxMaskModule.forRoot(), 
    FormsModule,
    NgBusyModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    NgSelect2Module,
  ], 
  providers : [
    BsDatepickerConfig
  ]
})
export class LayoutModule { }
