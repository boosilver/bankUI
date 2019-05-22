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



// ----------------------------------------- Create PO -------------------------------------------------------------------
export class TransactionCreatePurchaseOrder {
  static empty(): TransactionCreatePurchaseOrder {
    const emptyObj = empty(TransactionCreatePurchaseOrder, 4);
    return emptyObj;
  }

  static sampleSubmitSr(): TransactionCreatePurchaseOrder {
    const sample: TransactionCreatePurchaseOrder = TransactionCreatePurchaseOrder.empty();

    sample.TO = 'lotus';
    sample.FROM = 'themall';
    sample.PO_KEY = '002';
    sample.VALUE = '250';

    return sample;
  }

  constructor(
    public TO: string,
    public FROM: string,
    public PO_KEY: string,
    public VALUE: string,
  ) { }
}
// ------------------------------------------ END -------------------------------------------------------------------

// ----------------------------------------- CREATE INVOICE ---------------------------------------------------------
export class TransactionCreateInvoice {
  static empty(): TransactionCreateInvoice {
    const emptyObj = empty(TransactionCreateInvoice, 6);
    return emptyObj;
  }

  static sampleSubmitSr(): TransactionCreateInvoice {
    const sample: TransactionCreateInvoice = TransactionCreateInvoice.empty();

    sample.TO = 'themall';
    sample.FROM = 'lotus';
    sample.INVOICE_KEY = '004';
    sample.PO_KEY = '000';
    sample.VALUE = '200';


    return sample;
  }

  constructor(
    public TO: string,
    public FROM: string,
    public INVOICE_KEY: string,
    public VALUE: string,
    public PO_KEY: string,

  ) { }
}
// ------------------------------------------------- END ---------------------------------------------------------


export class TransactionFinanceInvoice {
  static empty(): TransactionFinanceInvoice {
    const emptyObj = empty(TransactionFinanceInvoice, 5);
    return emptyObj;
  }

  static sampleSubmitSr(): TransactionFinanceInvoice {
    const sample: TransactionFinanceInvoice = TransactionFinanceInvoice.empty();

    sample.inv_no = '';
    sample.DATE = todate;
    sample.inv_tax_seller = '';
    sample.finance_running_no = '';
    sample.inv_amount_used = '100';

    return sample;
  }

  constructor(
    public inv_no: string,
    public DATE: string,
    public inv_tax_seller: string,
    public finance_running_no: string,
    public inv_amount_used: string
  ) { }
}

//  ---------------------------------------------- Check PO key ------------------------------------------------
export class InquirePOByKeyFields {
  static empty(): InquirePOByKeyFields {
    const emptyObj = empty(InquirePOByKeyFields, 5);
    return emptyObj;
  }

  static sampleSubmitSr(): InquirePOByKeyFields {
    const sample: InquirePOByKeyFields = InquirePOByKeyFields.empty();

    sample.USER = 'lotus';
    sample.KEY = '004';
    sample.TYPE = 'PO';

    return sample;
  }

  constructor(
    public USER: string,
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

// ----------------------------------------- Request verify invoice ---------------------------------------------------------
export class Reqverinv {
  static empty(): Reqverinv {
    const emptyObj = empty(Reqverinv, 5);
    return emptyObj;
  }

  static sampleSubmitSr(): Reqverinv {
    const sample: Reqverinv = Reqverinv.empty();

    sample.TO = 'lotus';
    sample.BANK = 'bank';
    sample.DOC_LOAN = 'invoice';
    sample.KEY = '123';
    sample.LOAN_KEY = '00';

    return sample;
  }

  constructor(
    public TO: string,
    public BANK: string,
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
    sample.BANK = 'bank';
    sample.DOC_LOAN = 'invoice';
    sample.LOAN_KEY = '00';
    sample.PRICE_LOAN = '40';

    return sample;
  }

  constructor(
    public TO: string,
    public BANK: string,
    public DOC_LOAN: string,
    public LOAN_KEY: string,
    public PRICE_LOAN: string,
  ) { }
}
// ------------------------------------------------- END ---------------------------------------------------------

// ----------------------------------------- Accept Endorse ---------------------------------------------------------
export class Acceptendorse {
  static empty(): Acceptendorse {
    const emptyObj = empty(Acceptendorse, 4);
    return emptyObj;
  }

  static sampleSubmitSr(): Acceptendorse {
    const sample: Acceptendorse = Acceptendorse.empty();

    sample.BANK = 'bank';
    sample.FORM = 'lotus';
    sample.DOC_LOAN = 'invoice';
    sample.LOAN_KEY = '00';

    return sample;
  }

  constructor(

    public BANK: string,
    public FORM: string,
    public DOC_LOAN: string,
    public LOAN_KEY: string,

  ) { }
}
// ------------------------------------------------- END ---------------------------------------------------------