import assert from "node:assert";
import { DiceCollection } from "./diceCollection.ts";
import { Dice } from "./dice.ts";

export function parseDice(str: string): DiceCollection {
  /*
    Basic Approach:
    1. parse a first number. Every command must start with an number
    2. parse the `d`
    3. parse the second number
    4. if + or -, end parsing and return the dice collection
    5. if anything else, add relevant modifiers
  */
  const diceRegexp = /(\d+)([d|z])(\d+)/
  assert(diceRegexp.test(str), 'string doesn\'t contain {x}d{y} expression');

  const diceParsed = str.match(diceRegexp);
  assert(diceParsed, 'dice failed to parse')

  const numDice = diceParsed[1];
  const zero = diceParsed[2];
  const numFaces = diceParsed[3];

  assert(numDice && zero && numFaces)

  const collection: Dice[] = [];
  for(let i = 0; i < Number.parseInt(numDice); i++) {
    collection.push(new Dice(Number.parseInt(numFaces), zero === 'z'));
  }

  const ret = new DiceCollection(collection);
  // process modifiers - todo

  return ret;
}
