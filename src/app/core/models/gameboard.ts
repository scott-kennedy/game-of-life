export interface IGameboardRow extends Array<number> {
  [index: number]: number;
}

export class Gameboard extends Array {
  [index: number]: IGameboardRow;
}
