import SMA from './sma.js'; // Import the SMA class

// const SMA = require('./sma.js');

class EMA {
  constructor(period) {
    this.period = period;
    this.smooth = 2 / (period + 1);
    this.ema = null;  // Initialize EMA as null (no initial value)
    this.sma = new SMA(period);

    // Initial nextValue function (before SMA is calculated)
    this.nextValue = (value) => {
      const sma = this.sma.nextValue(value);
      if (sma) {
        this.ema = sma; // Set initial EMA to SMA once it's available

        // Overwrite nextValue with the EMA calculation
        this.nextValue = (value) => {
          this.ema = (value - this.ema) * this.smooth + this.ema;
          return this.ema;
        };

        // Define momentValue calculation
        this.momentValue = (value) => {
          console.log("EMA momentValue called", value);
          return (value - this.ema) * this.smooth + this.ema;
        };
      }
      return sma;
    };
  }

  // Placeholder for momentValue (before EMA is calculated)
  momentValue(value) {
    return;
  }
}

export default EMA; // Make the class available for other modules

