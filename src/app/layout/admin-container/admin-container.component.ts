import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { CryptoEnum } from 'src/app/helpers/crypto-enum';
import { RestClientService } from 'src/app/services/rest-client.service';
import { UserService } from 'src/app/services/user.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-admin-container-layout',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss']
})
export class LayoutComponent implements OnInit {

  user : any = {};
  itemToSave : any = {};
  modalRefModal? : BsModalRef;
  nombreDemandeEnAttente : any;
  requestRefresh ? : Subscription;
  isDashbordUrlActive : any;
  
  constructor(private restService : RestClientService,private userService : UserService, private modalService: BsModalService,public router:Router, private activeRoute: ActivatedRoute) { 
    this.user = this.userService.getCurrentUser();
    this.itemToSave.identite = this.user.nom +' '+this.user.prenoms;
  }

  openModal(template: TemplateRef<any>, item?: any) {
    let config = { backdrop: true, ignoreBackdropClick: true, id: 1, class: 'modal-md' };

    if (item) {
      this.itemToSave = { ...item };
    }

    this.modalRefModal = this.modalService.show(template, config);
  }

  deconnexion() {
    // On vide la sessionStorage et on le redirige sur authentification
    localStorage.removeItem(CryptoEnum?.user);
    this.router.navigate(['/authentification']);
  }

  getUrlActive(url ? : any) {

    console.log(" url ",url);
    
    if(url?.toLowerCase() == '/administration/dashbord') {
      this.isDashbordUrlActive = true;
    }else {
      this.isDashbordUrlActive = false;
    } 
  }

  getDefaultRoute() {
    let router: any = this.activeRoute?.snapshot;
    this.getUrlActive(router['_routerState']['url']);
  }

  ngOnInit(): void {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getUrlActive(event.url);
      }
    });

    this.getDefaultRoute();
    
  }

}
