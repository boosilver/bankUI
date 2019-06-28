import { Component, OnInit } from '@angular/core';
import { Reqverinv } from '.././model';
import { PROCURETOPAYService } from '../service/procuretopay.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Util} from '../../util/util'

@Component({
  selector: 'app-reqverinv',
  templateUrl: './reqverinv.component.html',
  styleUrls: ['./reqverinv.component.css']
})
export class ReqverinvComponent implements OnInit {
  model: Reqverinv = Reqverinv.empty();
  public loading = false;
  modalRef: BsModalRef;
  bsModalRef: BsModalRef;
  message: string;
  body: any;

  constructor(
    private modalService: BsModalService,
    private svc: PROCURETOPAYService
  ) { }

  ngOnInit() {
    var that = this;
    // setTimeout(function(){
    that.model = Reqverinv.sampleSubmitSr();
  }
  openModal(template: ReqverinvComponent) {
    if (this.model.TO.trim() && this.model.DOC_LOAN.trim() && this.model.KEY && this.model.LOAN_KEY) {
      this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered modal-sm fade show' });
    }
  }

  confirm(resulttemplate: any,errortemplate: any): void {
    this.model.TO = this.model.TO.trim();
    this.model.DOC_LOAN = this.model.DOC_LOAN.trim();
    this.model.KEY = this.model.KEY;
    this.model.LOAN_KEY = this.model.LOAN_KEY;

    console.log('Reqverinvoice DATA');
    console.log('saving draft ' + JSON.stringify(this.model));
    this.loading = true;
    this.svc.submitReqverinv(this.model)
      .subscribe(
        sr => {
          this.loading = false;
          console.log('reply:' + JSON.stringify(sr));
          this.message = 'Request Success';
          this.body = {
            "DATE": sr.INFO.DATE,
            "TO": sr.INFO.TO,
            "FROM": (sr.INFO.FROM),
            "TYPE": (sr.INFO.TYPE),
            "PO_KEY": sr.INFO.PO_KEY,
            "ADDRESS": sr.INFO.ADDRESS,
            "EMAIL": sr.INFO.EMAIL,
            "TEL_NUMBER": sr.INFO.TEL_NUMBER,
            "DELIVERY_ADDRESS": sr.INFO.DELIVERY_ADDRESS,
            "PRODUCT": sr.INFO.PRODUCT,
            "NUM_PRODUCT": sr.INFO.NUM_PRODUCT,
            "VALUE": sr.INFO.VALUE,
            "PRICE": sr.INFO.PRICE,
            "VAT": sr.INFO.VAT,
            "TAX_ID": sr.INFO.TAX_ID,
            "TOTAL_PRICE": sr.INFO.TOTAL_PRICE,
            "DELIVERY_DATE": sr.INFO.DELIVERY_DATE,
            "PAYMENT": sr.INFO.PAYMENT,
            "DETAIL": sr.INFO.DETAIL,
            "KEY": sr.KEY,
            "BANK": sr.INFO.BANK,
            "LOAN_AMOUNT": sr.INFO.LOAN_AMOUNT,
            "INSTALLMENT": sr.INFO.INSTALLMENT,
            "TOTAL_AMOUNT": sr.INFO.TOTAL_AMOUNT,
            "LOAN_KEY": sr.INFO.LOAN_KEY,
            "INVOICE_KEY": sr.INFO.INVOICE_KEY,
    
          }
    
          this.modalRef = this.modalService.show(resulttemplate, { class: 'modal-dialog-centered modal-md fade show' });

        },
        error => {
          this.loading = false;
          this.message = error;
          console.log('Error:' + error);
          this.modalRef = this.modalService.show(errortemplate, { class: 'modal-dialog-centered modal-lg fade show' });

        });
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
  
  Ok(): void {
    this.message = 'Ok!';
    this.modalRef.hide();
    setTimeout(function () {
      location.reload();
    }, 1500); // 5000 milliseconds means 5 seconds.
  }
  OkNoRepage(): void {
    this.message = 'Ok!';
    this.modalRef.hide();
  }
}