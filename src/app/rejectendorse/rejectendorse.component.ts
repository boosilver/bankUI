import { Component, OnInit } from '@angular/core';
import { RejectEndorse } from '.././model';
import { PROCURETOPAYService } from '../service/procuretopay.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Util} from '../../util/util'

@Component({
  selector: 'app-rejectendorse',
  templateUrl: './rejectendorse.component.html',
  styleUrls: ['./rejectendorse.component.css']
})
export class RejectendorseComponent implements OnInit {
  model: RejectEndorse = RejectEndorse.empty();
  public loading = false;
  modalRef: BsModalRef;
  bsModalRef: BsModalRef;
  message: string;

  constructor(
    private modalService: BsModalService,
    private svc: PROCURETOPAYService
  ) { }

  ngOnInit() {
    var that = this;
    // setTimeout(function(){
    that.model = RejectEndorse.sampleSubmitSr();
  }
  openModal(template: RejectEndorse) {
    if (this.model.TO.trim() && this.model.DOC_LOAN.trim() && this.model.LOAN_KEY) {
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }
  }

  confirm(): void {
    this.model.TO = this.model.TO.trim();
    this.model.DOC_LOAN = this.model.DOC_LOAN.trim();
    this.model.LOAN_KEY = this.model.LOAN_KEY;

    console.log('Reqverinvoice DATA');
    console.log('saving draft ' + JSON.stringify(this.model));
    this.loading = true;
    this.svc.RejectEndorse(this.model)
      .subscribe(
        sr => {
          this.loading = false;
          let message = 'Success';
          (<HTMLInputElement>document.getElementById('status')).value = message;
          console.log('reply:' + JSON.stringify(sr));
          document.getElementById("statusfield").style.display = "block";

        },
        error => {
          this.loading = false;

          let header = 'Error';
          // this.progressDialog.close();
          let message = error;
          (<HTMLInputElement>document.getElementById('status')).value = message;
          console.log('Error:' + message);
          document.getElementById("statusfield").style.display = "block";

        });
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}