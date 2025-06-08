import EMA from './ema.js';

let ema9 = new EMA(9);
let ema30 = new EMA(30);
let ema50 = new EMA(50);
let ema100 = new EMA(100);

let currEma9Value;
let currEma30Value;
let currEma50Value;
let currEma100Value;

let prevEma9Value;
let prevEma30Value;
let prevEma50Value;
let prevEma100Value;

let prevTimeStamp = -1;

const FIFTEEN_MINUTES_MICROSECONDS = 900_000_000;
// const FIFTEEN_MINUTES_MICROSECONDS = 10_000_000

// --- Session Storage Logging ---
function getStoredLogs() {
  return JSON.parse(sessionStorage.getItem('btc_ema_logs') || '[]');
}

function appendLogToSession(message) {
  const logs = getStoredLogs();
  logs.push({ timestamp: Date.now(), message });
  sessionStorage.setItem('btc_ema_logs', JSON.stringify(logs));
}

export function processBTCUSD(closingPrice, newTimeStamp) {

  if (newTimeStamp - prevTimeStamp >= FIFTEEN_MINUTES_MICROSECONDS) {
    currEma9Value = ema9.momentValue(closingPrice);
    currEma30Value = ema30.momentValue(closingPrice);
    currEma50Value = ema50.momentValue(closingPrice);
    currEma100Value = ema100.momentValue(closingPrice);

    let prevConditionBuyUp = !(prevEma30Value > prevEma50Value && prevEma50Value > prevEma100Value);

    // console.log(`EMA 3 is ${currEma30Value}, EMA 5 is ${currEma50Value}, EMA 7 is ${currEma100Value}`);

    if (prevConditionBuyUp &&
      currEma30Value > currEma50Value &&
      currEma50Value > currEma100Value) {
      const log = `Buy BTCUSD Up => EMA30: ${currEma30Value}, EMA50: ${currEma50Value}, EMA100: ${currEma100Value}, timestamp: ${newTimeStamp}`;
      console.log(log);
      alert(log);
      appendLogToSession(log);
    }

    let prevConditionSellUp = !(prevEma9Value < prevEma50Value);
    if (prevConditionSellUp &&
      currEma9Value < currEma50Value) {
      const log = `Sell BTCUSD Up => EMA9: ${currEma9Value}, EMA50: ${currEma50Value}, timestamp: ${newTimeStamp}`;
      console.log(log);
      alert(log);
      appendLogToSession(log);
    }

    let prevConditionBuyDown = !(prevEma30Value < prevEma50Value && prevEma50Value < prevEma100Value);

    if (prevConditionBuyDown &&
      currEma30Value < currEma50Value &&
      currEma50Value < currEma100Value) {
      const log = `Buy BTCUSD Down => EMA30: ${currEma30Value}, EMA50: ${currEma50Value}, EMA100: ${currEma100Value}, timestamp: ${newTimeStamp}`;
      console.log(log);
      alert(log);
      appendLogToSession(log);
    }

    let prevConditionSellDown = !(prevEma9Value > prevEma50Value);
    if (prevConditionSellDown &&
      currEma9Value > currEma50Value) {
      const log = `Sell BTCUSD Down => EMA9: ${currEma9Value}, EMA50: ${currEma50Value}, timestamp: ${newTimeStamp}`;
      console.log(log);
      alert(log);
      appendLogToSession(log);
    }

    ema9.nextValue(closingPrice);
    ema30.nextValue(closingPrice);
    ema50.nextValue(closingPrice);
    ema100.nextValue(closingPrice);

    prevEma9Value = currEma9Value;
    prevEma30Value = currEma30Value;
    prevEma50Value = currEma50Value;
    prevEma100Value = currEma100Value;
    prevTimeStamp = newTimeStamp;
  }
}