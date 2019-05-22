import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { InquirePOByKeyFields } from '.././model';
import { PROCURETOPAYService } from '../service/procuretopay.service';
@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {

  model: InquirePOByKeyFields = InquirePOByKeyFields.empty();
  
  //public urlApi:string = "http://localhost:8080/api/v1/idf/GetInvoiceByKeyFields/";
  public jasontree:any;
  public responseValue:any;
  public responseValueEN:any;
  public headerDatas:any;
  public loading = false;
  

  constructor(
   
    private router:Router,
    private svc: PROCURETOPAYService
  ) { }  
 
  ngOnInit() {
    // // ทำการเรียกใช้ HTTP request ผ่าน get() method
    // // ซึ่งจะได้ข้อมูลกลับมาในรูปแบบ Observable เราต้อง subscibe ตัว observer จึงจะทำงาน
    // // พอรอค่าที่จะถูกส่งกลับมาแล้วทำงาน
    // this.http.get('/assets/data/data2.json', {observe: 'response'})
    // .subscribe(resp => {
    //   console.log(resp);// ดูโครงสร้างของ json ทั้งหมดผ่าน console
    //   console.log(resp.status); // ดู status code ได้ค่า 200
    //   this.jsonData = resp;
    //   // this.headerDatas = resp.headers.get('ชื่อ property ส่วน header ที่ต้องการ');
    //   // ใช้ข้อมูลในส่วนของ response body  ที่ส่งออกมา
    //   this.results = resp.body;
    // });
    //   console.log("@"+this.responseValue);
    var that = this;
        // setTimeout(function(){
            that.model = InquirePOByKeyFields.sampleSubmitSr();
}

  onSubmit(){
    
    //  console.log('this.model : ');      
   
    // let data = f.value;
    // let inv_no = `${encodeURIComponent(f.value.inv_no)}/`;
    // let DATE = `${f.value.DATE}/`;
    // let inv_tax_seller = f.value.inv_tax_seller;
    this.loading = true;
   
    this.svc.InquirePOByKeyFields(this.model)
      .subscribe(result => {
        this.loading = false;
        console.log('result : '+JSON.stringify(result[0].INVOICE));   
      this.jasontree = JSON.stringify(result[0].INVOICE);   
      this.responseValue = []; //new Array(result[0].INVOICE)
      let body ={
        "InvoiceIdentity": result[0].INVOICE.InvoiceIdentity,
        "InvState": result[0].INVOICE.InvState,
        "InvAmount": (result[0].INVOICE.InvAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        "InvRemainingAmount": (result[0].INVOICE.InvRemainingAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        "EndorsementIdentity": result[0].INVOICE.EndorsementIdentity
      }
      this.responseValue.push(body);
            
      this.responseValueEN = [];
      let numFIN = 0 ;
      
      for(var itemEN = 0; itemEN < result[0].INVOICE.EndorsementList.length; itemEN++){
        let body ={
            "EndorsementIdentity" : result[0].INVOICE.EndorsementList[itemEN].ENDORSEMENT.EndorsementIdentity,
            "InvoiceIdentity" : result[0].INVOICE.EndorsementList[itemEN].ENDORSEMENT.InvoiceIdentity,
            "PublicKey" : result[0].INVOICE.EndorsementList[itemEN].ENDORSEMENT.PublicKey,
            "EndorsementTime" : result[0].INVOICE.EndorsementList[itemEN].ENDORSEMENT.EndorsementTime,
            "FinanceIdentity" : result[0].INVOICE.EndorsementList[itemEN].ENDORSEMENT.FinanceIdentity,
            "FinanceList": []
        }
        this.responseValueEN.push(body);
        for(let item = 0;item < result[0].INVOICE.EndorsementList[itemEN].ENDORSEMENT.FinanceList.length; item++){
          let body = {
            "FinanceIdentity" : result[0].INVOICE.EndorsementList[itemEN].ENDORSEMENT.FinanceList[item].FINANCE.FinanceIdentity,
            "EndorsementIdentity" : result[0].INVOICE.EndorsementList[itemEN].ENDORSEMENT.FinanceList[item].FINANCE.EndorsementIdentity,
            "FinanceRunningNo" : result[0].INVOICE.EndorsementList[itemEN].ENDORSEMENT.FinanceList[item].FINANCE.FinanceRunningNo,
            "FinanceTime" : result[0].INVOICE.EndorsementList[itemEN].ENDORSEMENT.FinanceList[item].FINANCE.FinanceTime,
            "InvAmountUsed" : (result[0].INVOICE.EndorsementList[itemEN].ENDORSEMENT.FinanceList[item].FINANCE.InvAmountUsed).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          };
          this.responseValueEN[itemEN].FinanceList.push(body);
          numFIN ++;
        }
      }
      //document.getElementById("result").style.display = "block";
      (<HTMLInputElement>document.getElementById("numEN")).value =  String(result[0].INVOICE.EndorsementList.length);
      (<HTMLInputElement>document.getElementById("numFIN")).value =  String(numFIN);
      document.getElementById("result").style.display = "block";
      document.getElementById("error").style.display = "none";
      // console.log( "@0 "+result.body[0].INVOICE.InvoiceIdentity);
      // console.log( "@1 "+this.responseValue[0].InvoiceIdentity);

      // BY ID
      // var element = document.getElementById("id01");
      // element.innerHTML = this.responseValue;

    },
    ( err ) => {
      this.loading = false;
      document.getElementById("result").style.display = "none";
      (<HTMLInputElement>document.getElementById("erMass")).value =  err;
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

  
 
 

  invoice() {
    this.router.navigateByUrl('/invoice');
  }
  endorse() {
    this.router.navigateByUrl('/endorse');
  }
  finance() {
    this.router.navigateByUrl('/finance');
  }

}
