import { Invoice, Performance, Play, Plays } from "./types/allTypes";

export function statement(invoice: Invoice, plays :Plays): string {
  let totalAmout: number = 0;
  let volumeCredits: number = 0;
  let result: string = `Statement for ${invoice.customer}\n`;

  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play: Play = plays[perf.playID];
    let thisAmount : number = amountFor(play,perf);
    
    // ボリューム特典のポイント加算
    volumeCredits += Math.max(perf.audience - 30, 0);
    //喜劇のときは１０人に付き、さらにポイント加算
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
    //注文の内訳出力
    result += ` ${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmout += thisAmount;
  }
  result += `Amount owed is ${format(totalAmout / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

const amountFor = (play:Play, perf:Performance) :number => {
  let thisAmount : number  = 0;
  switch (play.type) {
    case "tragedy": //悲劇ならまずは40,000円で３０人まで。追加分一人あたり１０００円
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30); //
      }
      break;
    case "comedy": //喜劇ならまずは30,000円＋一人あたり３００円（ただし２０人まで）。２１人以上の場合は、追加10,000円と追加一人あたりさらに＋５００円。
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20); //
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  return thisAmount;
};
