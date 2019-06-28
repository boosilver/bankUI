import { Component, OnInit } from '@angular/core';
import { TransactionEndorseInvoice } from '.././model';
import { PROCURETOPAYService } from '../service/procuretopay.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Util} from '../../util/util'

@Component({
  selector: 'app-endorse',
  templateUrl: './endorse.component.html',
  styleUrls: ['./endorse.component.css']
})
export class EndorseComponent implements OnInit {
  model: TransactionEndorseInvoice = TransactionEndorseInvoice.empty();
  public loading = false;
  modalRef: BsModalRef;
  bsModalRef: BsModalRef;
  message: string;

  constructor(
    private modalService: BsModalService,
    private svc: PROCURETOPAYService,
    // private _router: Router
  ) { }

  ngOnInit() {
    var that = this;
    // setTimeout(function(){
    that.model = TransactionEndorseInvoice.sampleSubmitSr();
  }

  openModal(template: EndorseComponent) {
    if (this.model.TO.trim() && this.model.DOC_LOAN.trim() && this.model.LOAN_KEY && this.model.PRICE_LOAN) {
      this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered modal-sm fade show' });
    }
  }


  confirm(resulttemplate: any,errortemplate: any): void {
    this.model.TO = this.model.TO.trim();
    this.model.DOC_LOAN = this.model.DOC_LOAN.trim();
    this.model.LOAN_KEY = this.model.LOAN_KEY;
    this.model.PRICE_LOAN = this.model.PRICE_LOAN;

    console.log('Endorse DATA');
    console.log('saving draft ' + JSON.stringify(this.model));
    this.loading = true;
    this.svc.submitEndorseInvoice(this.model)
      .subscribe(
        sr => {
          this.loading = false;
          console.log('reply:' + JSON.stringify(sr));
          this.message = 'Endorse Success';
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
