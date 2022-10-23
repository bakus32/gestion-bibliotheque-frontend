import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationServicesService } from 'src/app/services/notification-services.service';
import { RestClientService } from 'src/app/services/rest-client.service';
import { UserService } from 'src/app/services/user.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  user : any = {};
  itemToSave : any = {};
  busy?: Subscription;
  hasMotDePasseNonConforme : boolean = false;
  @Output() closeModal = new EventEmitter<any>();

   constructor(private restService: RestClientService,private utilities : UtilitiesService,private userService : UserService, private notificationService: NotificationServicesService) { 
    this.user = this.userService.getCurrentUser();
    this.itemToSave.identite = this.user.nom +' '+this.user.prenom;
  }

  confirmSaveItem() {

    if(!this.itemToSave.mot_passe) {
      this.notificationService.showNotificationMessage("error","Veuillez renseigner l'ancien mot de passe !");
      return;
    }

    if(!this.itemToSave.new_mot_passe) {
      this.notificationService.showNotificationMessage("error","Veuillez renseigner le nouveau mot de passe !");
      return;
    }

    if(!this.itemToSave.confirmPassword || this.itemToSave.confirmPassword != this.itemToSave.new_mot_passe) {
      this.notificationService.showNotificationMessage("error","Veuillez confirmer votre mot de passe !");
      return;
    }

    // Verifier la conformité du mot de passe
    if(this.utilities.verifPassword(this.itemToSave.new_mot_passe)) {
      this.hasMotDePasseNonConforme = true;
      return;
    }else {
      this.hasMotDePasseNonConforme = false;
    }


    Swal.fire({
      title: "Modification de mes accès",
      text: "Desirez-vous poursuivre cette action ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      confirmButtonColor: "#f2a252",
      cancelButtonColor: "#91949c",
      reverseButtons: true
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.updatePassword();
      }
    })
  }


  updatePassword() {

    const request = {
      id: this.user?.id,
      mot_passe: this.itemToSave?.mot_passe,
      new_mot_passe: this.itemToSave?.new_mot_passe,
      email:  this.user?.email
    };

    this.busy = this.restService.post('user/change-mot-passe', request)
    .subscribe(
        (res : any ) => {
            console.log(res);
            if (!res['error']) {
                //On verifie si il doit modifier son mot de passe
                this.notificationService.showNotificationMessage('success',res?.message);
                this.closeModal.emit(true);
               
            }else {
              this.notificationService.showNotificationMessage('error', res?.message);
            }
        },
        err => {
          this.notificationService.showNotificationMessage("error", this.notificationService.defaultMessage());
        }
    );

  }

  ngOnInit(): void {
  }

}
