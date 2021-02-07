import { Performance, Play } from "./types/allTypes";

export class PerformanceCalculator {
  performance: Performance;
  play: Play;
  constructor(aPerformance: Performance, play: Play) {
    this.performance = aPerformance;
    this.play = play;
  }
  //function statement
  get amount(): number {
    let result: number = 0;
    switch (this.play.type) {
      case "tragedy": //悲劇ならまずは40,000円で３０人まで。追加分一人あたり１０００円
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30); //
        }
        break;
      case "comedy": //喜劇ならまずは30,000円＋一人あたり３００円（ただし２０人まで）。２１人以上の場合は、追加10,000円と追加一人あたりさらに＋５００円。
        result = 30000;
        if (this.performance.audience > 20) {
          result += 10000 + 500 * (this.performance.audience - 20); //
        }
        result += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`unknown type: ${this.play.type}`);
    }
    return result;
  };

  get volumeCredits(): number {
    let result: number = 0;
    result += Math.max(this.performance.audience - 30, 0);
    if ("comedy" === this.play.type)
      result += Math.floor(this.performance.audience / 5);
    return result;
  };
}
