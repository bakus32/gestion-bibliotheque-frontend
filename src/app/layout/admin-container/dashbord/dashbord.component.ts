import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { Subscription } from 'rxjs';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import {frLocale} from 'ngx-bootstrap/locale';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
defineLocale('fr', frLocale);

var Highcharts = require('highcharts');

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {

  constructor() { 
  }

  ngOnInit(): void {
  }

}
