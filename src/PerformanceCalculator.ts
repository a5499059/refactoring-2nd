import { Performance, Play } from "./types/allTypes";

export class PerformanceCalculator {
  performance: Performance;
  play: Play;
  constructor(aPerformance: Performance, play: Play) {
    this.performance = aPerformance;
    this.play = play;
  }
}
