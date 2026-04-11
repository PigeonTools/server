export type DiceRequest = {
  req: string
}

export type DiceResult = {
  results: number[],
  included: number[],
  excluded: number[],
  total: number,
}
