import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationServicesService } from 'src/app/services/notification-services.service';
import { RestClientService } from 'src/app/services/rest-client.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from "sweetalert2";
import * as moment from 'moment';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.scss']
})
export class LivresComponent implements OnInit {

  
  listItems: Array<any> = []; // Pour recuperer la liste des utilisateurs
  listCategories :  Array<any> = []; // Pour recuperer la lsite des profils
  itemToSave : any = {}; // Variable de manipulation des champs pour l'enregistrement
  busyGet?: Subscription; // Loader lors des appel API
  modalRefModal?: BsModalRef; // Pour la manipulation du modal
  busySave?: Subscription; // Loader lors de la création d'un user
  itemToSearch : any = {};

  constructor(private restService: RestClientService, private notificationService: NotificationServicesService, private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>, item?: any) {
    let config = { backdrop: true, ignoreBackdropClick: true, id: 1, class: 'modal-md' };

    if (item) { 
      this.itemToSave = { ...item };
    }

    this.modalRefModal = this.modalService.show(template, config);
  }

  getItem() {
    /** Recuperation de la liste des livres  */

    const request = {
      user : 1,
      data : {
        titre : this.itemToSearch.searchFull || null
      }
    };

    this.busyGet = this.restService.post('livre/getByCriteria', request)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (!res['error']) {
            this.listItems = res?.items;
          }
        },
        err => {
          this.notificationService.showNotificationMessage("error", this.notificationService.defaultMessage());
        }
      );
  }

  getCategorie() {
    /** Recuperation de la liste des categories */
    const request = {
      user : 1,
      data : {
        libelle : this.itemToSearch.searchFull || null
      }
    };

    this.busyGet = this.restService.post('categorieLivre/getByCriteria', request)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (!res['error']) {
            this.listCategories = res?.items;
          }
        },
        err => {
          this.notificationService.showNotificationMessage("error", this.notificationService.defaultMessage());
        }
      );
  }

  
  confirmSaveItem() {

    this.itemToSave.messageError = "";
    let item : any =  {...this.itemToSave}

    if(!item.titre) {
      this.notificationService.showNotificationMessage("error","Veuillez renseigner le titre de l'ouvrage !");
      return;
    }

    if(!item.maisonEdition) {
      this.notificationService.showNotificationMessage("error","Veuillez renseigner la maison d'edition !");
      return;
    }

    if(!item.nombreExemplaires) {
      this.notificationService.showNotificationMessage("error","Veuillez renseigner le nombre d'exemplaires !");
      return;
    }

    if(!item.nombrePages) {
      this.notificationService.showNotificationMessage("error","Veuillez sélectionner le nombre de pages !");
      return;
    }


    if(!item.categorieId) {
      this.notificationService.showNotificationMessage("error","Veuillez sélectionner la categorie du livre !");
      return;
    }
    item.datePublication =  moment(this.itemToSave.datePublication).format("DD/MM/YYYY")

    Swal.fire({
      title: (item && item?.id) ? "Modification livre" : "Enregistrement livre",
      text: "Desirez-vous poursuivre cette action ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      confirmButtonColor: "#f2a252",
      cancelButtonColor: "#91949c",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveItem(item);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }

  saveItem(item : any) {

    const endPoint = "livre/" + (item?.id ? "update" : "create");

    const request = {
      user:1,
      datas:[item]  
     }

    this.busySave = this.restService.post(endPoint, request)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (!res['error']) {
            this.notificationService.showNotificationMessage('success', res?.message);
            this.modalRefModal?.hide();
            this.getItem();
          }
        },
        err => {
          this.notificationService.showNotificationMessage("error", this.notificationService.defaultMessage());
        }
      );

  }

  confirmDeleteItem(item : any) {
    Swal.fire({
      title: "Suppression",
      text: "Desirez-vous poursuivre cette action ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      confirmButtonColor: "#f2a252",
      cancelButtonColor: "#91949c",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteItem(item);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }

  deleteItem(item : any) {

    const endPoint = "livre/delete";

    const request = {
      user:1,
      datas:[{
        id : item?.id
      }]  
     }

    this.busySave = this.restService.post(endPoint, request)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (!res['hasError']) {
            this.notificationService.showNotificationMessage('success', res?.status.message);
            this.getItem();
          }
        },
        err => {
          this.notificationService.showNotificationMessage("error", this.notificationService.defaultMessage());
        }
      );

  }

  ngOnInit(): void {
    this.getItem();
    this.getCategorie();
  }

}
