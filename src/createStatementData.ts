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
    const calculator = new PerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    const result: PerformanceStatementData = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  };
  //function statement
  const playFor = (aPerformance: Performance): Play => {
    return plays[aPerformance.playID];
  };

  //fuction statement
  const volumeCreditsFor = (aPerformance: Performance): number => {
    return new PerformanceCalculator(aPerformance,aPerformance.play).volumeCredits;
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
