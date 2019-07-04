import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { InquirePOByKeyFields,InquireData,Myinterfacedata } from '.././model';
import { PROCURETOPAYService } from '../service/procuretopay.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-checkpo',
  templateUrl: './checkpo.component.html',
  styleUrls: ['./checkpo.component.css']
})
export class CheckpoComponent implements OnInit {

  model: InquireData = InquireData.empty();
  
  //public urlApi:string = "http://localhost:8080/api/v1/idf/GetInvoiceByKeyFields/";
  public jasontree:any;
  public responseValue:any;
  public responseValueEN:any;
  public headerDatas:any;
  public loading = false;
  Inquire$: Myinterfacedata
  showUI = false;
  body: any;
  key: any;
  modalRef: BsModalRef;
  bsModalRef: BsModalRef;
  message: any;
  

  constructor(
   
    private router:Router,
    private svc: PROCURETOPAYService,
    private modalService: BsModalService,

  ) { }  
 
  ngOnInit() {
    var that = this;
        // setTimeout(function(){
            that.model = InquireData.sampleSubmitSr();
}

async onSubmit() {
  console.log('saving draft ' + JSON.stringify(this.model));
  this.loading = true;
  await this.svc.InquireData(this.model)
    .subscribe((result: Myinterfacedata) => {
      this.Inquire$ = result;
      // console.log(this.Inquire$.DASHBOARD_LIST, "ddddddddddddddd")
      this.loading = false;
      for (let i = 0; i < result.DASHBOARD_LIST.length; i++) {
        if (result.DASHBOARD_LIST[i].STATUS == "REJECT") {
          result.DASHBOARD_LIST[i].SHOW_REJECT = true;
        } else if (result.DASHBOARD_LIST[i].STATUS == "WAIT") {
          result.DASHBOARD_LIST[i].SHOW_WAIT = true;
        } else if (result.DASHBOARD_LIST[i].STATUS == "COMPLETE") {
          result.DASHBOARD_LIST[i].SHOW_COMPLETE = true;
        }
      }
      console.log('result : ' + JSON.stringify(result));
      this.jasontree = JSON.stringify(result);
      this.responseValue = []; //new Array(result[0].INVOICE)
      // let body = {
      //   "TO": result.INFO.TO,
      //   "FROM": (result.INFO.FROM),
      //   "TYPE": (result.INFO.TYPE),
      //   "PO_KEY": result.INFO.PO_KEY,
      //   "ADDRESS": result.INFO.ADDRESS,
      //   "EMAIL": result.INFO.EMAIL,
      //   "TEL_NUMBER": result.INFO.TEL_NUMBER,
      //   "DELIVERY_ADDRESS": result.INFO.DELIVERY_ADDRESS,
      //   "PRODUCT": result.INFO.PRODUCT,
      //   "NUM_PRODUCT": result.INFO.NUM_PRODUCT,
      //   "VALUE": result.INFO.VALUE,
      //   "PRICE": result.INFO.PRICE,
      //   "TAX_ID": result.INFO.TAX_ID,
      //   "VAT": result.INFO.VAT,
      //   "TOTAL_PRICE": result.INFO.TOTAL_PRICE,
      //   "DELIVERY_DATE": result.INFO.DELIVERY_DATE,
      //   "PAYMENT": result.INFO.PAYMENT,
      //   "DETAIL": result.INFO.DETAIL,

      // }
      // this.responseValue.push(body);

      this.responseValueEN = [];

      //document.getElementById("result").style.display = "block";
      document.getElementById("result").style.display = "block";
      document.getElementById("error").style.display = "none";
    },
      (err) => {
        this.loading = false;
        document.getElementById("result").style.display = "none";
        (<HTMLInputElement>document.getElementById("erMass")).value = err;
        document.getElementById("error").style.display = "block";
        // กรณี error
        if (err.error instanceof Error) {
          // กรณี error ฝั่งผู้ใช้งาน หรือ การเชื่อมต่อเกิด error ขึ้น
          console.log('An error occurred:', err.error.message);
        } else { // กรณี error ฝั่ง server ไม่พบไฟล์ ,server error
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      });
}

async openModal(template: any, key: any) {
  this.loading = true;
  await this.svc.InquirePOByKeyFields(key)
    .subscribe(result => {
      this.loading = false;
      console.log('result : ' + JSON.stringify(result));
      // this.responseValue = []; //new Array(result[0].INVOICE)
      this.body = {
        "DATE": result.INFO.DATE,
        "TO": result.INFO.TO,
        "FROM": (result.INFO.FROM),
        "TYPE": (result.INFO.TYPE),
        "PO_KEY": result.INFO.PO_KEY,
        "ADDRESS": result.INFO.ADDRESS,
        "EMAIL": result.INFO.EMAIL,
        "TEL_NUMBER": result.INFO.TEL_NUMBER,
        "DELIVERY_ADDRESS": result.INFO.DELIVERY_ADDRESS,
        "PRODUCT": result.INFO.PRODUCT,
        "NUM_PRODUCT": result.INFO.NUM_PRODUCT,
        "VALUE": result.INFO.VALUE,
        "PRICE": result.INFO.PRICE,
        "VAT": result.INFO.VAT,
        "TAX_ID": result.INFO.TAX_ID,
        "TOTAL_PRICE": result.INFO.TOTAL_PRICE,
        "DELIVERY_DATE": result.INFO.DELIVERY_DATE,
        "PAYMENT": result.INFO.PAYMENT,
        "DETAIL": result.INFO.DETAIL,
        "KEY": result.KEY,
        "BANK": result.INFO.BANK,
        "LOAN_AMOUNT": result.INFO.LOAN_AMOUNT,
        "INSTALLMENT": result.INFO.INSTALLMENT,
        "TOTAL_AMOUNT": result.INFO.TOTAL_AMOUNT,
        "LOAN_KEY": result.INFO.LOAN_KEY,
        "INVOICE_KEY": result.INFO.INVOICE_KEY,

      }

      // this.openModal(this.body)
      //document.getElementById("result").style.display = "block";
      // document.getElementById("result").style.display = "block";
      // document.getElementById("error").style.display = "none";
      // console.log( "@0 "+result.body[0].INVOICE.InvoiceIdentity);
      // console.log( "@1 "+this.responseValue[0].InvoiceIdentity);

      // BY ID
      // var element = document.getElementById("id01");
      // element.innerHTML = this.responseValue;
      this.modalRef = this.modalService.show(template, { class: 'modal-md' });

    },
      (err) => {
        this.loading = false;
        document.getElementById("result").style.display = "none";
        (<HTMLInputElement>document.getElementById("erMass")).value = err;
        document.getElementById("error").style.display = "block";
        // กรณี error
        if (err.error instanceof Error) {
          // กรณี error ฝั่งผู้ใช้งาน หรือ การเชื่อมต่อเกิด error ขึ้น
          console.log('An error occurred:', err.error.message);
        } else { // กรณี error ฝั่ง server ไม่พบไฟล์ ,server error
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      });
  // console.log(JSON.stringify(template))
  // this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

  // this.modalRef = this.modalService.show(template, { class: 'modal-sm' });


}







createpo() {
  this.router.navigateByUrl('/CreatePO');
}
endorse() {
  this.router.navigateByUrl('/endorse');
}
finance() {
  this.router.navigateByUrl('/finance');
}

}