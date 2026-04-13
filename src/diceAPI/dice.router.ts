import { Router } from 'express';
import { parseDice } from '../diceAPI/api.ts';

export const diceRouter = Router();

diceRouter.post('/dice', (req, res) => {
  const body = req.body;
  try {
    const dc = parseDice(body['diceString']);
    const resp = dc.roll();
    res.send(resp);
  } catch (e) {
    res.status(500);
    res.send(`Failed to parse: diceString: ${body['diceString']}`);
  }
});