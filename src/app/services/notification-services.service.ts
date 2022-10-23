import { Injectable } from '@angular/core';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class NotificationServicesService {

  constructor() { }

  defaultMessage() {
    return 'Connexion momentanément interronpu !';
  }
  
 showNotificationMessage (type : any,message : any) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: type || 'success',
        title: message,
      });
}
}
