import { createStatementData } from "./createStatementData";
import { usd } from "./statement";
import {
  Invoice,
  Plays,
  StatementData,
} from "./types/allTypes";

export function htmlStatement(invoice: Invoice, plays: Plays): string {
  return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data: StatementData): string {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
  for (let perf of data.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;
}
