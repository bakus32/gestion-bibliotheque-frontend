import { Injectable } from '@angular/core';
import { CryptoEnum } from '../helpers/crypto-enum';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private utilities : UtilitiesService) { }

  getCurrentUser() {

    let userValue = localStorage.getItem(CryptoEnum.user);

    if(userValue) {
      return JSON.parse(this.utilities.decryptData(userValue));
    }
   
  }

  isLoggedIn():boolean {
    let user = this.getCurrentUser();
    return !!user; 
  }
}
