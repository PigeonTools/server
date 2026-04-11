import assert from "node:assert";

export class Dice {
  readonly sides: number
  readonly zeroIndex: boolean = false;
  rolled: undefined | number = undefined;

  constructor(sides: number, zero?: boolean) {
    assert(sides > 0);
    assert(Number.isInteger(sides) && Number.isFinite(sides))
    this.sides = sides;
    if(zero) this.zeroIndex = zero;
  }

  roll() {
    if(!this.rolled) {
      this.rolled = Math.floor(Math.random() * this.sides) + (this.zeroIndex ? 0 : 1);
    }
    return this.rolled;
  }

  toString() {
    if(!this.rolled) return '?'
    return `${this.rolled}`
  }
}
