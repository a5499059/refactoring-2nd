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
    throw new Error("これは使ってはいいけない。subClassの責務");
  };

  get volumeCredits(): number {
    let result: number = 0;
    result += Math.max(this.performance.audience - 30, 0);
    if ("comedy" === this.play.type)
      result += Math.floor(this.performance.audience / 5);
    return result;
  };
}

export class TragedyCalculator extends PerformanceCalculator {
  get amount(): number {
    let result: number = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30); //
    }
    return result;
  }
}

export class ComedyCalculator extends PerformanceCalculator {
  get amount(): number {
    let result: number = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20); //
    }
    result += 300 * this.performance.audience;
    return result;
  };
}
