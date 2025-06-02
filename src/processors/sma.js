import CircularBuffer from './providers/circular-buffer.js';


class SMA {
  constructor(period) {
    this.period = period;
    this.circular = new CircularBuffer(period);
    this.sum = 0;

    // Initial nextValue function (before buffer is filled)
    this.nextValue = (value) => {
      this.circular.push(value);
      this.sum += value;
      if (!this.circular.filled) return; // Not enough data yet

      // Overwrite nextValue with the actual SMA calculation logic
      this.nextValue = (value) => {
        this.sum = this.sum - this.circular.push(value) + value;
        return this.sum / this.period;
      };

      // Define momentValue calculation
      this.momentValue = (value) => {
        return (this.sum - this.circular.peek() + value) / this.period;
      };

      return this.sum / this.period; // Initial SMA value
    };
  }

  // Placeholder for momentValue (before buffer is filled)
  momentValue(value) {
    return; 
  }
}

export default SMA; // Allow importing SMA class in other files

