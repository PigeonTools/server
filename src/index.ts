import express from 'express';
import { parseDice } from './diceAPI/api.ts';

export const app = express()
const port = 3000

app.use(express.json())

app.get('/', (_, res) => {
  res.send('Hello, World!')
})

app.post('/dice', (req, res) => {
  const body = req.body;
  try {
    const dc = parseDice(body['diceString'])
    const resp = dc.roll();
    res.send(resp);
  } catch (e) {
    res.status(500);
    res.send(`Failed to parse: diceString: ${body['diceString']}`);
  }
})

if (process.argv[1] === new URL(import.meta.url).pathname) {
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
}
