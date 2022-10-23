import { Injectable } from '@angular/core';
import { CryptoEnum } from '../helpers/crypto-enum';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }


  verifPassword(password?: any) {

    // liste des contrôles
    const patternMinuscule = /[a-z]{1,}/;
    const patternMajuscule = /[A-Z]{1,}/;
    const patternChiffre = /[0-9]{1,}/;
    const patternNonAplhanumerique = /\W{1,}/;
    const patternUnicode = /[€•ƒ?]{1,}/;
    const patternPwdLength = /.{8,20}/;

    const checksList: any = {
      invalidLength: true,
      needMajuscule: true,
      needMinuscule: true,
      needChiffre: true,
      needNonAlpha: true,
      needUnicode: true,
      headerErrorMessage: ''
    };

    let resultTable = [];
    resultTable.push({ value: patternMinuscule.test(password) ? 1 : 0, title: 'needMinuscule' });
    resultTable.push({ value: patternMajuscule.test(password) ? 1 : 0, title: 'needMajuscule' });
    resultTable.push({ value: patternChiffre.test(password) ? 1 : 0, title: 'needChiffre' });
    resultTable.push({ value: patternNonAplhanumerique.test(password) ? 1 : 0, title: 'needNonAlpha' });
    resultTable.push({ value: patternUnicode.test(password) ? 1 : 0, title: 'needUnicode' });
    resultTable.push({ value: patternPwdLength.test(password) ? 1 : 0, title: 'invalidLength' });

    let resultat = resultTable.filter(x => x.value !== 0)
      .map(x => x.value)
      .reduce((acc, value) => value + acc, 0);

    if (--resultat >= 3 && resultTable[5].value === 1) {
      return null;
    } else {
      resultTable.forEach(item => {
        if (item.value === 1) {
          delete checksList[item.title];
        }
      });
      resultat = (Math.abs(resultat) + resultat) / 2; // if negatif returns 0 else returns x
      checksList.headerErrorMessage = 'Votre mot de passe doit respecter au moins (' + (3 - resultat) + ') des conditions (*) :';
      return checksList;
    }
  }

  encryptData(data: any) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), CryptoEnum.encryptionKey).toString();
  }

  decryptData(data: any) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, CryptoEnum.encryptionKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }

      return data;
    } catch (e) { }
  }

}
