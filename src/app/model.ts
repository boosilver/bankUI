import { Util } from '../util/util';
var todate;
import { Injectable } from '@angular/core';

const construct = function (constructor, argsArray) {


  function F(): void {
    constructor.apply(this, argsArray);
  }
  F.prototype = constructor.prototype;
  return new F();
}

const empty = function (constructor, numArgs: number) {
  todate = Util.todate();
  const nullArgs = new Array(numArgs).fill(null);
  return construct(constructor, nullArgs);
}

//  ---------------------------------------------- Check PO key ------------------------------------------------
export class InquirePOByKeyFields {
  static empty(): InquirePOByKeyFields {
    const emptyObj = empty(InquirePOByKeyFields, 2);
    return emptyObj;
  }

  static sampleSubmitSr(): InquirePOByKeyFields {
    const sample: InquirePOByKeyFields = InquirePOByKeyFields.empty();

    sample.KEY = '100';
    sample.TYPE = 'PO';

    return sample;
  }

  constructor(
    public KEY: string,
    public TYPE: string,

  ) { }
}
//  ---------------------------------------------- END key -----------------------------------------------------------

//  ---------------------------------------------- Check Invoice key ------------------------------------------------
export class InquireInvoiceByKeyFields {
  static empty(): InquireInvoiceByKeyFields {
    const emptyObj = empty(InquireInvoiceByKeyFields, 5);
    return emptyObj;
  }

  static sampleSubmitSr(): InquireInvoiceByKeyFields {
    const sample: InquireInvoiceByKeyFields = InquireInvoiceByKeyFields.empty();

    sample.INVOICE_ID = '';
    sample.KEY = '';
    sample.SELLER = '';

    return sample;
  }

  constructor(
    public INVOICE_ID: string,
    public KEY: string,
    public SELLER: string,
  ) { }
}
//  ---------------------------------------------- END key -----------------------------------------------------------

// ----------------------------------------- LOAN by INV ---------------------------------------------------------
export class Loanbyinv {
  static empty(): Loanbyinv {
    const emptyObj = empty(Loanbyinv, 5);
    return emptyObj;
  }

  static sampleSubmitSr(): Loanbyinv {
    const sample: Loanbyinv = Loanbyinv.empty();

    sample.BANK = 'bank';
    sample.FROM = 'lotus';
    sample.DOC_LOAN = 'PO';
    sample.KEY = '000';
    sample.LOAN_KEY = '00';

    return sample;
  }

  constructor(
    public BANK: string,
    public FROM: string,
    public DOC_LOAN: string,
    public KEY: string,
    public LOAN_KEY: string,

  ) { }
}
// ------------------------------------------------- END ---------------------------------------------------------

// ----------------------------------------- Request verify ---------------------------------------------------------
export class Reqverinv {
  static empty(): Reqverinv {
    const emptyObj = empty(Reqverinv, 5);
    return emptyObj;
  }

  static sampleSubmitSr(): Reqverinv {
    const sample: Reqverinv = Reqverinv.empty();

    sample.TO = 'lotus';
    sample.DOC_LOAN = 'PO';
    sample.KEY = '123';
    sample.LOAN_KEY = '00';

    return sample;
  }

  constructor(
    public TO: string,
    public DOC_LOAN: string,
    public KEY: string,
    public LOAN_KEY: string,

  ) { }
}
// ------------------------------------------------- END ---------------------------------------------------------


// ------------------------------------------------- Endorse Invoice ---------------------------------------------------------
export class TransactionEndorseInvoice {
  static empty(): TransactionEndorseInvoice {
    const emptyObj = empty(TransactionEndorseInvoice, 5);
    return emptyObj;
  }

  static sampleSubmitSr(): TransactionEndorseInvoice {
    const sample: TransactionEndorseInvoice = TransactionEndorseInvoice.empty();

    sample.TO = 'themall';
    sample.DOC_LOAN = 'PO';
    sample.LOAN_KEY = '00';
    sample.PRICE_LOAN = '40';

    return sample;
  }

  constructor(
    public TO: string,
    public DOC_LOAN: string,
    public LOAN_KEY: string,
    public PRICE_LOAN: string,
  ) { }
}
// ------------------------------------------------- END ---------------------------------------------------------

// ------------------------------------------------- Reject endorse ---------------------------------------------------------
export class RejectEndorse {
  static empty(): RejectEndorse {
    const emptyObj = empty(RejectEndorse, 3);
    return emptyObj;
  }

  static sampleSubmitSr(): RejectEndorse {
    const sample: RejectEndorse = RejectEndorse.empty();

    sample.TO = 'themall';
    sample.DOC_LOAN = 'PO';
    sample.LOAN_KEY = '00';

    return sample;
  }

  constructor(
    public TO: string,
    public DOC_LOAN: string,
    public LOAN_KEY: string,
  ) { }
}
// ------------------------------------------------- END ---------------------------------------------------------


// ----------------------------------------- Dashboard ---------------------------------------------------------
export interface Myinterfacedata {
  DASHBOARD_DATA: DashboardData
  DASHBOARD_LIST: DashboardList[]

}

export interface DashboardData {
  LOAN_INFO: number
  LOAN_INFO_WAIT: number
  ENDORSE_LOAN: number
  ENDORSE_LOAN_WAIT: number
  INVOICE_WAIT: number
  INVOICE_COMPLETE: number
}

export interface DashboardList {
  COMPANY: string
  DATE: string
  TYPE: string
  KEY: string
  LOAN_KEY: string
  STATUS: string
}
// ------------------------------------------------- END ---------------------------------------------------------