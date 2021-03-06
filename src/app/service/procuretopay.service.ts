
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Http, Headers, Request, RequestMethod, Response, ResponseContentType } from '@angular/http';
import {
  TransactionEndorseInvoice, InquireData,
  InquireInvoiceByKeyFields, InquirePOByKeyFields, Loanbyinv, Reqverinv,RejectEndorse,Myinterfacedata
} from '../model';

import { HttpClient } from '@angular/common/http'


@Injectable()
export class PROCURETOPAYService {

  constructor(
    private http: Http,
    private httpClient: HttpClient

  ) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    // headers.append('X-krungsri-api-orgid', localStorage.getItem('orgid'));
    // headers.append('X-krungsri-api-appid', localStorage.getItem('appid'));
    // headers.append('X-krungsri-api-secret', localStorage.getItem('secret'));
  }


  private handleError(error: any) {
    let errorBody = JSON.parse(error._body);
    let errorMsg = errorBody.message;
    console.log('Error message: ', errorMsg);
    return throwError(errorMsg);
  };

  //  ----------------------------------- Submit Requset verify invoice --------------------------------------------------------
  submitReqverinv(model: Reqverinv): Observable<any> {
    const url = environment.backendbank + 'Request_Verify'; // transaction.submit.service.request
    let headers = new Headers();        // http://localhost:7004/api/v1/Request_Verify
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
    })
      .catch(this.handleError);
  }
  //  ----------------------------------- ------------------ --------------------------------------------------------

  //  ----------------------------------- Submit Endorse --------------------------------------------------------
  submitEndorseInvoice(model: TransactionEndorseInvoice): Observable<any> {
    const url = environment.backendbank + 'endorse_loan'; // transaction.submit.service.request
    let headers = new Headers();       //http://localhost:7004/api/v1/endorse_loan
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
    })
      .catch(this.handleError);
  }
  //  ----------------------------------- ------------------ --------------------------------------------------------

  // --------------------------------------------- Check Invoice key -----------------------------------------------------------
  InquireInvoiceByKeyFields(model: InquireInvoiceByKeyFields): Observable<any> {
    const url = environment.backendBaseUrl + 'CheckInvoice';//asset.service.request
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
      // return res.json()[0];
    })
      .catch(this.handleError);
  }
  // -------------------------------------------------- End key -----------------------------------------------------------


  // --------------------------------------------- Check PO key -----------------------------------------------------------
  InquirePOByKeyFields(model: InquirePOByKeyFields): Observable<any> {
    const url = environment.backendbank + 'GetValue';//asset.service.request
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
      // return res.json()[0];
    })
      .catch(this.handleError);
  }
  // -------------------------------------------------- End key -----------------------------------------------------------


  // --------------------------------------------- Reject Endorse -----------------------------------------------------------
  RejectEndorse(model: RejectEndorse): Observable<any> {
    const url = environment.backendbank + 'RejectEndorse';//asset.service.request
    let headers = new Headers();      // http://localhost:7004/api/v1/RejectEndorse
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
      // return res.json()[0];
    })
      .catch(this.handleError);
  }
  // -------------------------------------------------- End key -----------------------------------------------------------

  // --------------------------------------------- Get Dashboard -----------------------------------------------------------

  dashboard(): Observable<Myinterfacedata> {
    const url = environment.backendbank + 'GetList_Loan';
    // const url = 'assets/config.json';
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    console.log(this.httpClient.get(url))
    return this.httpClient.get<Myinterfacedata>(url)
  }

  dashboardlist(): Observable<Myinterfacedata> {
    const url = environment.backendbank + 'GetList_Loan';
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
      // return res.json()[0];
    })
      .catch(this.handleError);
  }
  // -------------------------------------------------- End  -----------------------------------------------------------

  // --------------------------------------------- Check Data inquire-----------------------------------------------------------
  InquireData(model: InquireData): Observable<any> {
    const url = environment.backendbank + 'Getall';//asset.service.request
    let headers = new Headers();      //http://localhost:7004/api/v1/Getall
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
      // return res.json()[0];
    })
      .catch(this.handleError);
  }
  // -------------------------------------------------- End key -----------------------------------------------------------

}
