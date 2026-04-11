import assert from 'node:assert/strict'
import {describe, it} from 'node:test'
import { Dice } from '../../src/diceAPI/dice.ts';

describe('Test Framework', () => {
  it('should successful execute passing test', () => {
    assert(true);
  })
})

describe('single dice', () => {
  it('repeated rolls on single dice return same result', () => {
    const dice = new Dice(1_000_000_000);
    const roll1 = dice.roll();
    assert(dice.rolled === roll1, 'rolled value is not equal to roll1');
    assert(roll1 === dice.roll(), 'second roll did not equal first');
  })

  it('should roll within bounds, 1 index', () => {
    const dice_size = Math.floor(Math.random() * 100);
    for(let i = 0; i < 1000; i++) {
      const d = new Dice(dice_size);
      assert(d.roll() <= dice_size, `dice rolled invalid ${d.roll()} for size ${dice_size}`);
      assert(d.roll() > 0, `dice rolled invalid ${d.roll()} for size ${dice_size}`);
    }
  })

  it('should roll within bounds, 0 index', () => {
    const dice_size = Math.floor(Math.random() * 100);
    for(let i = 0; i < 1000; i++) {
      const d = new Dice(dice_size, true);
      assert(d.roll() < dice_size, `dice rolled invalid ${d.roll()} for size ${dice_size}`);
      assert(d.roll() >= 0, `dice rolled invalid ${d.roll()} for size ${dice_size}`);
    }
  })
})
