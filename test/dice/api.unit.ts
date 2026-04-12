import assert from 'node:assert/strict'
import {describe, it} from 'node:test'
import { parseDice } from '../../src/diceAPI/api.ts';

describe('parse string to collection of dice', () => {
  it('should fail to parse empty string', () => {
    assert.throws(() => parseDice(''));
  })

  it('should fail with invalid dice expression', () => {
    assert.throws(() => parseDice('3x9'));
  })

  it('should create collection of 1 indexed dice', () => {
    const dc = parseDice('3d6');
    assert(dc.dice.length === 3)
    assert(dc.dice[0]?.sides === 6);
    assert(dc.dice[0]?.zeroIndex === false);
  })

  it('should create dice collection 0 indexed', () => {
    const dc = parseDice('2z20');
    assert(dc.dice.length === 2);
    assert(dc.dice[0]?.sides === 20);
    assert(dc.dice[0]?.zeroIndex === true);
  })

  it('should create collection of equal dice', () => {
    const dc = parseDice('10d6');
    dc.dice.forEach(e => {
      assert(e.sides === 6);
      assert(e.zeroIndex === false);
    })
  })
});
