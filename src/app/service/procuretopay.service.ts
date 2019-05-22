
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Http, Headers, Request, RequestMethod, Response, ResponseContentType } from '@angular/http';
import {
  TransactionCreateInvoice, TransactionEndorseInvoice,
  TransactionFinanceInvoice, TransactionCreatePurchaseOrder,
  InquireInvoiceByKeyFields, InquirePOByKeyFields, Loanbyinv, Reqverinv, Acceptendorse
} from '../model';

@Injectable()
export class PROCURETOPAYService {

  constructor(
    private http: Http
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

  //  ----------------------------------- Submit Create PO --------------------------------------------------------
  submitCreatePurchaseOrder(model: TransactionCreatePurchaseOrder): Observable<any> {
    const url = environment.backendbuyer + 'CreatePO'; // transaction.submit.service.request 
    let headers = new Headers();      //http://localhost:7003/api/v1/CreatePO
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
    })
      .catch(this.handleError);
  }
  //  ----------------------------------- ------------------ --------------------------------------------------------

  //  ----------------------------------- Submit Create INVOICE --------------------------------------------------------
  submitCreateInvoice(model: TransactionCreateInvoice): Observable<any> {
    const url = environment.backendseller + 'CreateInvoice'; // transaction.submit.service.request
    let headers = new Headers();        // http://localhost:7002/api/v1/CreateInvoice
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
    })
      .catch(this.handleError);
  }
  //  ----------------------------------- ------------------ --------------------------------------------------------

  //  ----------------------------------- Submit Loan by INVOICE --------------------------------------------------------
  submitLoanbyInvoice(model: Loanbyinv): Observable<any> {
    const url = environment.backendbuyer + 'Loan'; // transaction.submit.service.request
    let headers = new Headers();        // http://localhost:7003/api/v1/Loan
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
    })
      .catch(this.handleError);
  }
  //  ----------------------------------- ------------------ --------------------------------------------------------

  //  ----------------------------------- Submit Requset verify invoice --------------------------------------------------------
  submitReqverinv(model: Reqverinv): Observable<any> {
    const url = environment.backendbank + 'Request_Verify_Invoice'; // transaction.submit.service.request
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

  //  ----------------------------------- Accept Endorse --------------------------------------------------------
  submitAcceptendorse(model: Acceptendorse): Observable<any> {
    const url = environment.backendbuyer + 'Accept'; // transaction.submit.service.request
    let headers = new Headers();       //http://localhost:7003/api/v1/Accept
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
    })
      .catch(this.handleError);
  }
  //  ----------------------------------- ------------------ --------------------------------------------------------

  submitFinanceInvoice(model: TransactionFinanceInvoice): Observable<any> {
    const url = environment.backendBaseUrl + 'idf/Invoice/Finance'; // transaction.submit.service.request
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
    })
      .catch(this.handleError);
  }

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
    const url = environment.backendseller + 'GetPO';//asset.service.request
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



}
