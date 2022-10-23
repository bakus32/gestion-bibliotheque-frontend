import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestClientService } from '../services/rest-client.service';
import { NotificationServicesService } from '../services/notification-services.service';
import { HttpClientModule } from '@angular/common/http';
import {NgBusyModule} from 'ng-busy';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { UserService } from '../services/user.service';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@NgModule({
  declarations: [
    UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgBusyModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  providers : [RestClientService,NotificationServicesService,UserService],
  exports : [
    UpdatePasswordComponent
  ]
})
export class SharedModule { }
