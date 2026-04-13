import express from 'express';
import { diceRouter } from './diceAPI/dice.router.ts'

export const app = express()
const port = 3000

app.use(express.json())

app.get('/', (_, res) => {
  res.send('Hello, World!')
})

app.use(diceRouter);

if (process.argv[1] === new URL(import.meta.url).pathname) {
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
}
