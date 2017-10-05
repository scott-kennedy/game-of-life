export class Cell {
  constructor(private x: number, private y: number, public isAlive: boolean) {}

  clone() {
    return new Cell(this.x, this.y, this.isAlive);
  }

  findNeighbors(board) {
    return board.filter(cell => {
      const xDistance = Math.abs(this.x - cell.x);
      const yDistance = Math.abs(this.y - cell.y);

      if (xDistance <= 1 && yDistance <= 1) {
        return cell;
      }
      return null;
    });
  }

  countLivingNeighbors(board = []) {
    const neighbors = this.findNeighbors(board);

    // Subtract one because we include ourselves in the neighbors
    return neighbors.filter(cell => cell.isAlive).length - (this.isAlive ? 1 : 0);
  }

  birth() {
    this.isAlive = true;
  }

  death() {
    this.isAlive = false;
  }
}
