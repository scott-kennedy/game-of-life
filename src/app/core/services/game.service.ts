import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

/* Rules:
 *  Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
 *  Any live cell with two or three live neighbours lives on to the next generation.
 *  Any live cell with more than three live neighbours dies, as if by overpopulation.
 *  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
@Injectable()
export class GameService {
  constructor() {}

  buildNewGameboard(width, height): Observable<any> {
    return this.initializeLiveCells(width, height).switchMap(livingCells =>
      this.createEmptyBoard(width, height).switchMap(board =>
        this.addLivingCells(board, width, livingCells)
      )
    );
  }

  getNextGeneration(gameboard = []): Observable<any> {
    const nextGameboard = gameboard.map(row => [...row]);
    const rows = gameboard.length;
    const cols = gameboard[0].length;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const neighbors = this.countLivingNeighbors(row, col, gameboard);
        if (neighbors > 3 || neighbors < 2) {
          nextGameboard[row][col] = 0;
        } else if (neighbors === 3) {
          nextGameboard[row][col] = 1;
        }
      }
    }

    if (this.compareGenerations(gameboard, nextGameboard)) {
      return of(gameboard);
    }
    return of(nextGameboard);
  }

  checkGameEnded(gameboard = []): Observable<boolean> {
    // We flatten the gameboard in two places, maybe we should just always return a flattened
    // gameboard that way the service can take care of everything.
    const flatGameboard = [].concat.apply([], gameboard);
    const hasLivingCells = flatGameboard.filter(cell => cell === 1).length;

    return of(!hasLivingCells);
  }

  private countLivingNeighbors(row: number, col: number, board): number {
    // Simplified way of counting neighbors
    return (
      this.getNeighbor(row - 1, col - 1, board) +
      this.getNeighbor(row - 1, col, board) +
      this.getNeighbor(row - 1, col + 1, board) +
      this.getNeighbor(row, col - 1, board) +
      this.getNeighbor(row, col + 1, board) +
      this.getNeighbor(row + 1, col - 1, board) +
      this.getNeighbor(row + 1, col, board) +
      this.getNeighbor(row + 1, col + 1, board)
    );
  }

  private addLivingCells(board: number, width: number, cells = []): Observable<any> {
    cells.map(cell => {
      const col = cell[0];
      const row = cell[1];
      board[row][col] = 1;
    });
    return of(board);
  }

  private initializeLiveCells(width: number, height: number): Observable<any> {
    const liveCells = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const isAlive = Math.random() > 0.85 ? true : false;
        if (isAlive) {
          liveCells.push([x, y]);
        }
      }
    }

    return of(liveCells);
  }

  private createEmptyBoard(width: number, height: number): Observable<any> {
    return of(
      Array(height)
        .fill(0)
        .map(() => Array(width).fill(0))
    );
  }

  private getNeighbor(row: number, col: number, board): number {
    try {
      return board[row][col] !== undefined ? board[row][col] : 0;
    } catch (e) {
      return 0;
    }
  }

  private compareGenerations(gameboard, nextGameboard): boolean {
    // Lazy way of comapring the two arrays
    return gameboard.toString() === nextGameboard.toString();
  }
}
