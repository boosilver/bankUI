import { Component, OnInit } from '@angular/core';
import { TransactionFinanceInvoice } from '.././model';
import { PROCURETOPAYService } from '../service/procuretopay.service';
import { Util } from '../../util/util';
@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {
  model: TransactionFinanceInvoice = TransactionFinanceInvoice.empty();
  public loading = false;

  constructor(
    private svc: PROCURETOPAYService,
    // private _router: Router
  ) { }

  ngOnInit() {
    var that = this;
        // setTimeout(function(){
            that.model = TransactionFinanceInvoice.sampleSubmitSr();
  }

  onSubmit() {
    this.model.inv_no=this.model.inv_no.trim();
    this.model.DATE=this.model.DATE.trim();
    this.model.inv_tax_seller=this.model.inv_tax_seller.trim();
    this.model.inv_amount_used=this.model.inv_amount_used.trim();
    this.model.finance_running_no=this.model.finance_running_no.trim();
    
    let FINno = Util.pad(Number(this.model.finance_running_no));
    this.model.finance_running_no = FINno ;
    console.log('uilog save');
    console.log('saving draft ' + JSON.stringify(this.model));
    this.loading = true;
    this.svc.submitFinanceInvoice(this.model)
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
                  let message = error;
                  (<HTMLInputElement>document.getElementById('status')).value = message;
                  console.log('Error:' + message);
                  document.getElementById("statusfield").style.display = "block";
                  
              });
  }
}
