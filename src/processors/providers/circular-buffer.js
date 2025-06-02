class CircularBuffer {
  constructor(length) {
    this.length = length;
    this.filled = false;
    this.pointer = 0;
    this.buffer = new Array(length);
    this.maxIndex = length - 1;
  }

  push(item) {
    const overwritten = this.buffer[this.pointer];
    this.buffer[this.pointer] = item;
    this.iteratorNext();
    return overwritten;
  }

  // Deprecated: Use peek instead
  pushback(item) {
    this.iteratorPrev();
    const overwritten = this.buffer[this.pointer];
    this.buffer[this.pointer] = item;
    return overwritten;
  }

  peek() {
    return this.buffer[this.pointer];
  }

  forEach(callback) {
    let idx = this.pointer;
    let virtualIdx = 0;
    while (virtualIdx !== this.length) {
      callback(this.buffer[idx], virtualIdx);
      idx = (this.length + idx + 1) % this.length;
      virtualIdx++;
    }
  }

  forEachRight(callback) {
    let idx = (this.length + this.pointer - 1) % this.length;
    let virtualIdx = this.length - 1;
    while (virtualIdx !== -1) {  // Changed the condition for forEachRight
      callback(this.buffer[idx], virtualIdx);
      idx = (this.length + idx - 1) % this.length;
      virtualIdx--;
    }
  }

  fill(item) {
    this.buffer.fill(item);
    this.filled = true;
  }

  toArray() {
    return this.buffer;
  }

  iteratorNext() {
    this.pointer++;
    if (this.pointer > this.maxIndex) {
      this.pointer = 0;
      this.filled = true;
    }
  }

  iteratorPrev() {
    this.pointer--;
    if (this.pointer < 0) {
      this.pointer = this.maxIndex;
    }
  }
}

export default CircularBuffer; // Make the class available for other modules

