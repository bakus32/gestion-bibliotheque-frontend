import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationServicesService } from 'src/app/services/notification-services.service';
import { RestClientService } from 'src/app/services/rest-client.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from "sweetalert2";

@Component({
  selector: 'app-auteurs',
  templateUrl: './auteurs.component.html',
  styleUrls: ['./auteurs.component.scss']
})
export class AuteursComponent implements OnInit {

  
  listItems: Array<any> = []; // Pour recuperer la liste des données
  itemToSave : any = {}; // Variable de manipulation des champs pour l'enregistrement
  busyGet?: Subscription; // Loader lors des appel API get
  modalRefModal?: BsModalRef; // Pour la manipulation du modal
  busySave?: Subscription; // Loader lors de la création
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
    /** Recuperation de la liste des auteurs  */

    const request = {
      user : 1,
      data : {
        nom : this.itemToSearch.searchFull || null
      }
    };

    this.busyGet = this.restService.post('auteur/getByCriteria', request)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (!res['hasError']) {
            this.listItems = res?.items;
          }
        },
        err => {
          this.notificationService.showNotificationMessage("error", this.notificationService.defaultMessage());
        }
      );
  }
  
  confirmSaveItem(item : any) {

    this.itemToSave.messageError = "";

    if(!item.nom) {
      this.notificationService.showNotificationMessage("error","Veuillez renseigner le nom de l'auteur !");
      return;
    }

    if(!item.prenoms) {
      this.notificationService.showNotificationMessage("error","Veuillez renseigner le prénoms de l'auteur !");
      return;
    }

    if(!item.specialite) {
      this.notificationService.showNotificationMessage("error","Veuillez renseigner la spécialité !");
      return;
    }


    Swal.fire({
      title: (item && item?.id) ? "Modification auteur" : "Enregistrement auteur",
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

    const endPoint = "auteur/" + (item?.id ? "update" : "create");

    const request = {
      user:1,
      datas:[item]  
     }

    this.busySave = this.restService.post(endPoint, request)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (!res['hasError']) {
            this.notificationService.showNotificationMessage('success', res?.status.message);
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

    const endPoint = "auteur/delete";

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
  }

}
