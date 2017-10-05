export class Cell {
  constructor(private x: number, private y: number, public isAlive: boolean) {}

  public static findNeighbors(cell, board) {
    return board.filter(otherCell => {
      const xDistance = Math.abs(cell.x - otherCell.x);
      const yDistance = Math.abs(cell.y - otherCell.y);

      if (xDistance <= 1 && yDistance <= 1) {
        return otherCell;
      }
      return null;
    });
  }

  public static countLivingNeighbors(cell, board = []) {
    const neighbors = Cell.findNeighbors(cell, board);

    // Subtract one because we include ourselves in the neighbors
    return neighbors.filter(neighbor => neighbor.isAlive).length - (cell.isAlive ? 1 : 0);
  }

  clone() {
    return new Cell(this.x, this.y, this.isAlive);
  }

  birth() {
    this.isAlive = true;
  }

  death() {
    this.isAlive = false;
  }
}
