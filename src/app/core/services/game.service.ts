import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Cell } from '../models/cell';

@Injectable()
export class GameService {
  constructor() {}

  initializeBoard(width: number, height: number) {
    const gameBoard = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const itsAlive = Math.random() > 0.85 ? true : false;
        gameBoard.push(new Cell(x, y, itsAlive));
      }
    }
    // Get the board size...
    // Get the board configuration
    // Initialize all the cells

    return of(gameBoard);
  }

  nextGeneration(gameBoard) {
    return of(
      gameBoard.map((cell: Cell) => {
        const cellCopy = cell.clone();

        const neighbors = Cell.countLivingNeighbors(cellCopy, gameBoard);
        if (cellCopy.isAlive && (neighbors > 3 || neighbors < 2)) {
          cellCopy.death();
        }

        if (!cellCopy.isAlive && neighbors === 3) {
          cellCopy.birth();
        }

        return cellCopy;
      })
    );
  }
}

// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
