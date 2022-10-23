import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef,
  ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationServicesService } from 'src/app/services/notification-services.service';
import { RestClientService } from 'src/app/services/rest-client.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { CryptoEnum } from '../../helpers/crypto-enum';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  itemUser: any = {};
  codeGenerate : any; // Continedra le code captchar
  itemToSave: any = {}; // Objet de manipulation des champs du formulaire sur l'interface
  busyConnexion?: Subscription; // Loader lors des appel API
  canUpdatePassword: boolean = false;
  isPasswordForgetForm: boolean = false;
  hasMotDePasseNonConforme : boolean = false;
  hasPasswordWordForget : boolean = false;
  user : any = {};

  
  constructor(public router: Router, private notificationService: NotificationServicesService, private utilities: UtilitiesService,
    private restService : RestClientService) { 
    this.generateCode();
  }

  generateCode() {
    // Generation du code captchar
    this.codeGenerate = (Math.random() + 1).toString(36).substring(8);  
  }

  login() {

    if (!this.itemToSave.identifiant || !this.itemToSave.password) {
      this.notificationService.showNotificationMessage("error", "Veuillez renseigner le login et le mot de passe !");
      return;
    }

    if(!this.itemToSave.codeCapchar || (this.itemToSave.codeCapchar != this.codeGenerate)) {
      this.notificationService.showNotificationMessage("error", "Veuillez renseigner un code de captcha valide !");
      return;
    }


    const request = {
      user : 1,
      data : {
        login : this.itemToSave.identifiant || null,
        passwd : this.itemToSave.password || null,
      }
    };

    this.busyConnexion = this.restService.post('users/login', request)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (!res['hasError']) {
             // Fake data pour simuler l'utilisateur connecté
    this.user = {
      nom : 'BAKAYOKO',
      prenom :  'YOUNOUSS',
      id : '1',
    };

    // On crypte les valeur et on les stock dans le localstorage
    localStorage.setItem(CryptoEnum?.user, this.utilities.encryptData(JSON.stringify((this.user))));

    // On effectue la redirection
    this.router.navigate(['/administration']);
          }
        },
        err => {
          this.notificationService.showNotificationMessage("error", this.notificationService.defaultMessage());
        }
      );

  }

  updatePassword() {

    if(!this.itemToSave.password) {
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

    // Verifier la conformité du mot de passe (8 caractères ...)
    if(this.utilities.verifPassword(this.itemToSave.new_mot_passe)) {
      this.hasMotDePasseNonConforme = true;
      return;
    }else {
      this.hasMotDePasseNonConforme = false;
    }

    /** Fonction api pour changement de mot de passe */

    /** Fin fonction changelebt de mot de passe */

  }

  ngOnInit(): void {
  }

}
