import { Invoice, Performance, Play, Plays } from "./types/allTypes";

export function statement(invoice: Invoice, plays: Plays): string {
  //function statement
  const playFor = (aPerformance: Performance): Play => {
    return plays[aPerformance.playID];
  };

  //function statement
  const amountFor = (aPerformance: Performance): number => {
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
  const volumeCreditsFor = (aPerformance: Performance): number => {
    let result: number = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  };

  //fuction statement
  const usd = (aNumber: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber/100);
  };

  //function statement
  const totalVolumeCredits = () :number => {
    let result= 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  //function statement
  const totalAmount = () :number => {
    let result: number = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }


  //top level


  let result: string = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    //注文の内訳出力
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;
}
