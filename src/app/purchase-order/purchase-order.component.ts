import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionCreatePurchaseOrder } from '.././model';
import { PROCURETOPAYService } from '../service/procuretopay.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Util} from '../../util/util'

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  model: TransactionCreatePurchaseOrder = TransactionCreatePurchaseOrder.empty();
  public loading = false;
  modalRef: BsModalRef;
  bsModalRef: BsModalRef;
  message: string;

  constructor(
    private svc: PROCURETOPAYService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    var that = this;
    // setTimeout(function(){
    that.model = TransactionCreatePurchaseOrder.sampleSubmitSr();
  }

  openModal(template: PurchaseOrderComponent) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.model.TO = this.model.TO.trim();
    this.model.FROM = this.model.FROM.trim();
    // this.model.VALUE = this.model.VALUE.trim();
    // this.model.PO_KEY = this.model.PO_KEY.trim(); เป็น number ไม่ต้องใช้ trim
    this.model.PO_KEY = Util.pad(Number(this.model.PO_KEY));
    this.model.VALUE = Util.pad(Number(this.model.VALUE));

    console.log('PO DATA');
    console.log('saving draft ' + JSON.stringify(this.model));
    this.loading = true;
    this.svc.submitCreatePurchaseOrder(this.model)
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
