import { PerformanceCalculator } from "./PerformanceCalculator";
import {
  Invoice,
  Performance,
  Play,
  Plays,
  PerformanceStatementData,
  StatementData,
} from "./types/allTypes";

export function createStatementData(
  invoice: Invoice,
  plays: Plays
): StatementData {
  //function statement
  const enrichPerformance = (
    aPerformance: Performance
  ): PerformanceStatementData => {
    const calculator = new PerformanceCalculator(aPerformance); 
    const result: PerformanceStatementData = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  };
  //function statement
  const playFor = (aPerformance: Performance): Play => {
    return plays[aPerformance.playID];
  };
  //function statement
  const amountFor = (aPerformance: Performance): number => {
    let result: number = 0;
    switch (aPerformance.play.type) {
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
        throw new Error(`unknown type: ${aPerformance.play.type}`);
    }
    return result;
  };

  //fuction statement
  const volumeCreditsFor = (aPerformance: Performance): number => {
    let result: number = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === aPerformance.play.type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  };

  //function statement
  const totalVolumeCredits = (data): number => {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  };

  //function statement
  const totalAmount = (data): number => {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  };

  //main
  const result: any = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;
}
