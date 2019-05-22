import { Component, OnInit } from '@angular/core';
import { Acceptendorse } from '.././model';
import { PROCURETOPAYService } from '../service/procuretopay.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Util} from '../../util/util'

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.css'],
})
export class AcceptComponent implements OnInit {
  model: Acceptendorse = Acceptendorse.empty();
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
        that.model = Acceptendorse.sampleSubmitSr();
  }

  openModal(template: AcceptComponent) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  confirm(): void {
    this.model.BANK=this.model.BANK.trim();
    this.model.FORM=this.model.FORM.trim();
    this.model.DOC_LOAN=this.model.DOC_LOAN.trim();
    this.model.LOAN_KEY = Util.pad(Number(this.model.LOAN_KEY));
   
    console.log('Endorse DATA');
    console.log('saving draft ' + JSON.stringify(this.model));
    this.loading = true;
    this.svc.submitAcceptendorse(this.model)
            .subscribe(
              sr =>{ 
                this.loading = false;
                let message = 'Success';
                (<HTMLInputElement>document.getElementById('status')).value = message;
                console.log('reply:' + JSON.stringify(sr));
                document.getElementById("statusfield").style.display = "block";
                 
              },
              error => {
                  this.loading = false;
                  let header = 'Error';
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
