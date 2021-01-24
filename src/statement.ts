import { Invoice, Performance, Play, Plays } from "./types/allTypes";

export function statement(invoice: Invoice, plays: Plays): string {
  //function statement
  const playFor = (aPerformance: Performance): Play => {
    return plays[aPerformance.playID];
  };

  //function statement
  const amountFor = ( aPerformance: Performance): number => {
    let result: number = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy": //悲劇ならまずは40,000円で３０人まで。追加分一人あたり１０００円
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30); //
        }
        break;
      case "comedy": //喜劇ならまずは30,000円＋一人あたり３００円（ただし２０人まで）。２１人以上の場合は、追加10,000円と追加一人あたりさらに＋５００円。
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20); //
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
  };

  //fuction statement
  const volumeCreditsFor = (perf: Performance) :number => {
    let volumeCredits :number = 0;
    volumeCredits += Math.max(perf.audience - 30, 0);
    //喜劇のときは１０人に付き、さらにポイント加算
    if ("comedy" === playFor(perf).type)
      volumeCredits += Math.floor(perf.audience / 5);
    return volumeCredits;
  }

  //top level
  let totalAmout: number = 0;
  let volumeCredits: number = 0;
  let result: string = `Statement for ${invoice.customer}\n`;

  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    
    volumeCredits += volumeCreditsFor(perf);

    //注文の内訳出力
    result += ` ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmout += amountFor(perf);
  }
  result += `Amount owed is ${format(totalAmout / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}
