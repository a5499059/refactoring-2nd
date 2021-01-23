import { statement } from "../src/statement";
import { Invoice } from "../src/types/allTypes";
import * as invoices from "../src/invoices.json";
import * as plays from "../src/plays.json";



const expected : string = `Statement for BigCo
 Hamlet: $650.00 (55 seats)
 As You Like It: $580.00 (35 seats)
 Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`;
describe("statement test",():void =>{
  let res: string;
    it("test",():void =>{
    invoices.forEach(invoice => {
    res = (statement(invoice, plays));
    });
    expect(res).toBe(expected);
    });
  });
