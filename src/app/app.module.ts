import { AppRoutes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, RequestOptions } from '@angular/http';
import { CommonModule, APP_BASE_HREF } from '@angular/common';

import { LoadingModule } from 'ngx-loading';
import { ModalModule } from 'ngx-bootstrap/modal';

//------- Service --------
import { PROCURETOPAYService } from './service/procuretopay.service';
//------- End Service ----------

//------- Component --------
import { AppComponent } from './app.component';
import { EndorseComponent } from './endorse/endorse.component';
import { CheckpoComponent } from './checkpo/checkpo.component';
import { ReqverinvComponent } from './reqverinv/reqverinv.component';
import { RejectendorseComponent } from './rejectendorse/rejectendorse.component';

//------- End Component ----------

@NgModule({
  declarations: [
    AppComponent,
    EndorseComponent,
    CheckpoComponent,
    ReqverinvComponent,
    RejectendorseComponent,
   
    

  ],
  imports: [
    HttpModule, CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    LoadingModule,
    ModalModule.forRoot()

  ],
  providers: [PROCURETOPAYService],
  bootstrap: [AppComponent]
})
export class AppModule { }
