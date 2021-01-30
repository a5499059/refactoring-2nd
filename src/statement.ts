import { Invoice, Performance, Play, Plays } from "./types/allTypes";
import {createStatementData} from "./createStatementData";

export function statement(invoice: Invoice, plays: Plays): string {
  return renderPlainText(createStatementData(invoice, plays));
}

export function renderPlainText(data): string {
  //fuction statement
  const usd = (aNumber: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  };

  //top level

  let result: string = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    //注文の内訳出力
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}
