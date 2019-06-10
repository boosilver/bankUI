import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { PROCURETOPAYService } from '../service/procuretopay.service';
import { Myinterfacedata } from '../model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  DASHBOARD$: Myinterfacedata
  // DASHBOARD_LIST: Myinterfacedata[]
  showUI = false;
  
  constructor(
    private svc: PROCURETOPAYService,

  ) { }

  // ngOnInit() {
  //   this.svc.dashboard()
  //   .then(DASHBOARD_DATA => {
  //     this.DASHBOARD_DATA = DASHBOARD_DATA
  //   })

  //   this.svc.dashboardlist()
  //   .then(DASHBOARD_LIST => {
  //     this.DASHBOARD_LIST = DASHBOARD_LIST
  //   })
  // }

  async ngOnInit() {

    await this.svc.dashboardlist()
      .subscribe((DASHBOARD: Myinterfacedata) => {
        // console.log('5555555555555555555555555555' + (JSON.stringify(DASHBOARD)))
        this.DASHBOARD$ = DASHBOARD
        // console.log('----------------------------' + (JSON.stringify(this.DASHBOARD$)))
        if (this.DASHBOARD$) this.showUI = true;
      })

  }

  
}
