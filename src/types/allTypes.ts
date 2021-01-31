export type Performance = {
  playID: string;
  audience: number;
  play?: Play;
};

export type Invoice = {
  customer: string;
  performances: Array<Performance>;
};

export type Play = {
  name: string;
  type: string;
};

export type Plays = {
  [playID: string]: Play;
};

export type PerformanceStatementData = Performance & {
  play?: Play;
  amount?: number;
  volumeCredits?: number;
};
export type PerformanceStatementDatas = {
  performances: [PerformanceStatementData];
};

export type StatementData = {
  customer: string;
  totalAmount: number;
  totalVolumeCredits: number;
} & PerformanceStatementDatas;
