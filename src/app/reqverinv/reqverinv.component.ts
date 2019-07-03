import { Component, OnInit } from '@angular/core';
import { Reqverinv } from '.././model';
import { PROCURETOPAYService } from '../service/procuretopay.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Util} from '../../util/util'
import { st } from '@angular/core/src/render3';

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
  showAccept: any;

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
            "FROM": (sr.INFO.FROM),
            "TYPE": sr.INFO.TYPE,
            "BANK": sr.INFO.BANK,

            "TO": sr.INFO.PO.TO,
            "PO_KEY": sr.INFO.PO.PO_KEY,
            "ADDRESS": sr.INFO.PO.ADDRESS,
            "EMAIL": sr.INFO.PO.EMAIL,
            "TEL_NUMBER": sr.INFO.PO.TEL_NUMBER,
            "TAX_ID": sr.INFO.PO.TAX_ID,
            "DELIVERY_ADDRESS": sr.INFO.PO.DELIVERY_ADDRESS,
            "PRODUCT": sr.INFO.PO.PRODUCT,
            "NUM_PRODUCT": sr.INFO.PO.NUM_PRODUCT,
            "VALUE": sr.INFO.PO.VALUE,
            "PRICE": sr.INFO.PO.PRICE,
            "VAT": sr.INFO.PO.VAT,
            "TOTAL_PRICE": sr.INFO.PO.TOTAL_PRICE,
            "DELIVERY_DATE": sr.INFO.PO.DELIVERY_DATE,
            "PAYMENT": sr.INFO.PO.PAYMENT,
            "DETAIL": sr.INFO.PO.DETAIL,
            "LOAN_AMOUNT": sr.INFO.PO.LOAN_AMOUNT,
            "INSTALLMENT": sr.INFO.PO.INSTALLMENT,
            "TOTAL_AMOUNT": sr.INFO.PO.TOTAL_AMOUNT,
            "LOAN_KEY": sr.INFO.PO.LOAN_KEY,
            "INVOICE_KEY": sr.INFO.PO.INVOICE_KEY,
          }
        if (sr.INFO.FROM == "invoice"){
          this.showAccept = "SHOWBUTTON"
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
  }
  Oknorefresh(): void {
    this.message = 'Ok!';
    this.modalRef.hide();
  }
}