import { Routes } from '@angular/router';
import {EndorseComponent} from './endorse/endorse.component';
import { CheckpoComponent } from './checkpo/checkpo.component';
import { ReqverinvComponent } from './reqverinv/reqverinv.component';
import { RejectendorseComponent } from './rejectendorse/rejectendorse.component';


export const AppRoutes: Routes = [
    { path: '', redirectTo: '/purchaseorder', pathMatch: 'full' },
    { path: 'endorse', component: EndorseComponent},
    { path: 'checkpo', component: CheckpoComponent},
    { path: 'reqverinv', component: ReqverinvComponent},
    { path: 'rejectendorse', component: RejectendorseComponent},

];
