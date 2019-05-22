
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Http, Headers, Request, RequestMethod, Response, ResponseContentType } from '@angular/http';
import { TransactionCreateInvoice, TransactionEndorseInvoice, TransactionFinanceInvoice, InquireInvoiceByKeyFields } from '../model';

@Injectable()
export class IDFProxyService {

  constructor(
    private http: Http
  ) { }

  createAuthorizationHeader(headers: Headers) {
    // headers.append('Access-Control-Allow-Origin', '*');
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


  submitCreateInvoice(model: TransactionCreateInvoice): Observable<any> {
    const url = environment.backendBaseUrl + 'idf/proxy/Invoice/Create'; // transaction.submit.service.request
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
    })
      .catch(this.handleError);
  }
  submitEndorseInvoice(model: TransactionEndorseInvoice): Observable<any> {
    const url = environment.backendBaseUrl + 'idf/proxy/Invoice/Endorse'; // transaction.submit.service.request
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
    })
      .catch(this.handleError);
  }
  submitFinanceInvoice(model: TransactionFinanceInvoice): Observable<any> {
    const url = environment.backendBaseUrl + 'idf/proxy/Invoice/Finance'; // transaction.submit.service.request
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
    })
      .catch(this.handleError);
  }


  InquireInvoiceByKeyFields(id: any): Observable<any> {
    const url = environment.backendBaseUrl + 'idf/proxy/Invoice/GetByKeyFields';//asset.service.request
    const filter = `/${encodeURIComponent(id.inv_no)}/${id.DATE}/${id.inv_tax_seller}` //`?filter={"where": { "srId": "${id}" }}`;
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url + filter, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
      // return res.json()[0];
    })
      .catch(this.handleError);
  }





}


