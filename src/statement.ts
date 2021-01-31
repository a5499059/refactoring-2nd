import { Invoice, Plays, StatementData } from "./types/allTypes";
import { createStatementData } from "./createStatementData";

export function statement(invoice: Invoice, plays: Plays): string {
  return renderPlainText(createStatementData(invoice, plays));
}

export function renderPlainText(data: StatementData): string {
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

export function usd(aNumber: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}
