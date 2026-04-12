import assert from 'node:assert/strict'
import {describe, it} from 'node:test'
import { Dice } from '../../src/diceAPI/dice.ts';
import { DiceCollection } from '../../src/diceAPI/diceCollection.ts';

describe('collections of dice', () => {
  it('repeated roll on collection return same result', () => {
    const dice: Dice[] = [];
    for(let i = 0; i < 10; i++) dice.push(new Dice(Math.floor(Math.random() * 100) + 1))
    const coll = new DiceCollection(dice);
    const r1 = coll.roll();
    const r2 = coll.roll();
    assert(JSON.stringify(r1) === JSON.stringify(r2));
  })

  it('should roll within bounds, 1 index', () => {
    const numDice = Math.floor(Math.random() * 3);
    const numFaces = Math.floor(Math.random() * 6) + 1;

    for(let i = 0; i < 1000; i++) {
      const dice: Dice[] = [];
      for(let i = 0; i < numDice; i++) {
        dice.push(new Dice(numFaces));
      }
      const coll = new DiceCollection(dice);
      const {total} = coll.roll();
      assert(total <= numDice * numFaces, `${total} was smaller than expected for ${numDice}d${numFaces}`)
      assert(total >= numDice, `${total} was larger than expected for ${numDice}d${numFaces}`)
    }
  })

  it('should roll within bounds, 0 index', () => {
    const numDice = Math.floor(Math.random() * 3);
    const numFaces = Math.floor(Math.random() * 6) + 1;

    for(let i = 0; i < 1000; i++) {
      const dice: Dice[] = [];
      for(let i = 0; i < numDice; i++) {
        dice.push(new Dice(numFaces, true));
      }
      const coll = new DiceCollection(dice);
      const {total} = coll.roll();
      assert(total <= numDice * (numFaces - 1), `${total} was smaller than expected for ${numDice}d${numFaces}`)
      assert(total >= 0, `${total} was larger than expected for ${numDice}d${numFaces}`)
    }
  })
})
