import { Routes } from '@angular/router';
import {InvoiceComponent} from './invoice/invoice.component';
import {EndorseComponent} from './endorse/endorse.component';
import {FinanceComponent} from './finance/finance.component';
import {IndexComponent} from './index/index.component';
import {PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { CheckpoComponent } from './checkpo/checkpo.component';
import { UserdataComponent } from './userdata/userdata.component';
import { LoanbyinvComponent } from './loanbyinv/loanbyinv.component';
import { ReqverinvComponent } from './reqverinv/reqverinv.component';
import { AcceptComponent } from './accept/accept.component';


export const AppRoutes: Routes = [
    { path: '', redirectTo: '/purchaseorder', pathMatch: 'full' },
    { path: 'checkinvoice', component: IndexComponent },
    { path: 'invoice', component: InvoiceComponent },
    { path: 'endorse', component: EndorseComponent},
    { path: 'finance', component: FinanceComponent},
    { path: 'purchaseorder', component: PurchaseOrderComponent},
    { path: 'checkpo', component: CheckpoComponent},
    { path: 'userdata', component: UserdataComponent},
    { path: 'loanbyinv', component: LoanbyinvComponent},
    { path: 'reqverinv', component: ReqverinvComponent},
    { path: 'accept', component: AcceptComponent},

    
];
