import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';

import { Gameboard } from '../models/gameboard';

/* Rules:
 *  Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
 *  Any live cell with two or three live neighbours lives on to the next generation.
 *  Any live cell with more than three live neighbours dies, as if by overpopulation.
 *  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
@Injectable()
export class GameService {
  constructor() {}

  buildNewGameboard(width: number, height: number): Observable<Gameboard> {
    return this.initializeLiveCells(width, height).switchMap(livingCells =>
      this.createEmptyBoard(width, height).switchMap(board =>
        this.addLivingCells(board, livingCells)
      )
    );
  }

  getNextGeneration(width: number, gameboard: Gameboard = []): Observable<Gameboard> {
    if (!gameboard.length) {
      return of(gameboard);
    }
    const nextGameboard = gameboard.slice();
    const boardSize = gameboard.length;

    for (let i = 0; i < boardSize; i++) {
      const neighbors = this.countLivingNeighbors(i, width, gameboard);
      if (neighbors > 3 || neighbors < 2) {
        nextGameboard[i] = 0;
      } else if (neighbors === 3) {
        nextGameboard[i] = 1;
      }
    }

    if (this.compareGenerations(gameboard, nextGameboard)) {
      return of(gameboard);
    }
    return of(nextGameboard);
  }

  checkGameEnded(gameboard: Gameboard = []): Observable<boolean> {
    const hasLivingCells = gameboard.filter(cell => cell === 1).length;

    return of(!hasLivingCells);
  }

  toggleCell(cellIndex: number, width: number, board: Gameboard): Observable<Gameboard> {
    const nextGameboard = board.slice();
    nextGameboard[cellIndex] = nextGameboard[cellIndex] ? 0 : 1;

    return of(nextGameboard);
  }

  private countLivingNeighbors(cellIndex: number, width: number, board: Gameboard): number {
    const boardSize = board.length;
    let neighborCount = 0;
    let checkAbove = false;
    let checkBelow = false;

    // Above
    if (cellIndex >= width) {
      checkAbove = true;
      neighborCount += board[cellIndex - width];
    }

    // Below
    if (cellIndex + width < boardSize) {
      checkBelow = true;
      neighborCount += board[cellIndex + width];
    }

    // Right
    if (cellIndex % width !== width - 1) {
      const rightNeighborIndex = cellIndex + 1;
      neighborCount += board[rightNeighborIndex];

      // Above
      if (checkAbove) {
        neighborCount += board[rightNeighborIndex - width];
      }

      // Below
      if (checkBelow) {
        neighborCount += board[rightNeighborIndex + width];
      }
    }

    // Left
    if (cellIndex % width !== 0) {
      const leftNeighborIndex = cellIndex - 1;
      neighborCount += board[leftNeighborIndex];

      // Above
      if (checkAbove) {
        neighborCount += board[leftNeighborIndex - width];
      }

      // Below
      if (checkBelow) {
        neighborCount += board[leftNeighborIndex + width];
      }
    }

    return neighborCount;
  }

  private addLivingCells(board: Gameboard, cells: number[] = []): Observable<Gameboard> {
    const newBoard = board.slice();
    cells.forEach(cell => (newBoard[cell] = 1));

    return of(newBoard);
  }

  private initializeLiveCells(width: number, height: number): Observable<number[]> {
    const liveCells = [];
    const boardSize = width * height;

    for (let i = 0; i < boardSize; i++) {
      const isAlive = Math.random() > 0.85 ? true : false;
      if (isAlive) {
        liveCells.push(i);
      }
    }

    return of(liveCells);
  }

  private createEmptyBoard(width: number, height: number): Observable<Gameboard> {
    const boardSize = width * height;

    return of(Array(boardSize).fill(0));
  }

  private compareGenerations(gameboard: Gameboard, nextGameboard: Gameboard): boolean {
    // Lazy way of comapring the two arrays
    return gameboard.toString() === nextGameboard.toString();
  }
}
