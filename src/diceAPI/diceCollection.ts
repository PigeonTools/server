import { Dice } from "./dice.ts";
import type { DiceResult } from "./types.ts";

export class DiceCollection {
  readonly dice: Dice[];
  result: DiceResult | undefined = undefined;
  
  constructor(dice: Dice[]) {
    this.dice = dice;
  }

  roll(): DiceResult {
    const results = this.dice.map(e => e.roll());
    const included = results; // not implemented
    const excluded: number[] = []; // not implemented;
    const total = results.reduce((a, b) => a + b, 0);
    this.result = {
      results,
      included,
      excluded,
      total
    }
    return this.result;
  }

  toString(): string {
    if(!this.result) return '?';
    return JSON.stringify(this.result);
  }
}
