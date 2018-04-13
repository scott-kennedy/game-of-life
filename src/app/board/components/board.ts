import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { Cell } from '../../core/models/cell';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cgol-board',
  template: `
    <svg
      [attr.width]="viewportSize.width"
      [attr.height]="viewportSize.height"
      (click)="onCellClick($event)">
      <svg:g cgol-cell *ngFor="let cell of cells" [cell]="cell"></svg:g>
    </svg>
  `
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() gameboard;
  @Input() width: number;
  @Input() height: number;
  @Input() viewportSize;

  @Output() onClickCell = new EventEmitter();
  cellWidth: number;
  cellHeight: number;
  cells: any[];

  constructor() {}

  ngOnInit() {
    this.setCellWidth();
    this.setCellHeight();
    this.buildCells();
  }

  ngOnChanges(changes: SimpleChanges) {
    let rebuildCells = false;

    if (changes.width || changes.viewportSize) {
      this.setCellWidth();
      rebuildCells = true;
    }

    if (changes.height || changes.viewportSize) {
      this.setCellHeight();
      rebuildCells = true;
    }

    if (rebuildCells) {
      this.buildCells();
    }

    if (changes.gameboard) {
      this.updateCells(changes.gameboard.currentValue);
    }
  }

  // TODO cell building is a candidate to move to store
  buildCells() {
    const maxCells = this.width * this.height;
    this.cells = [];
    for (let i = 0; i < maxCells; i++) {
      const cell: Cell = {
        id: i,
        width: this.cellWidth,
        height: this.cellHeight,
        x: this.getXOffsetFromIndex(i),
        y: this.getYOffsetFromIndex(i),
        isAlive: this.gameboard[i]
      };

      this.cells.push(cell);
    }
  }

  // TODO cell updating is a candidate to move to store
  updateCells(gameboard: any[]) {
    // TODO if gameboard.length < this.cells.length, slice this.cells to remove delete call
    // from for loop
    const size = gameboard.length;

    for (let i = 0; i < size; i++) {
      const currentCell: Cell = this.cells[i];
      if (currentCell) {
        const cellChanged = gameboard[i] !== currentCell.isAlive;
        if (cellChanged) {
          this.cells[i] = Object.assign({}, this.cells[i], { isAlive: gameboard[i] });
        }
      } else {
        delete this.cells[i];
      }
    }
  }

  getXOffsetFromIndex(index) {
    return this.cellWidth * (index % this.width);
  }

  getYOffsetFromIndex(index) {
    return this.cellHeight * Math.floor(index / this.width);
  }

  onCellClick(event) {
    const cellId = event.target.getAttribute('dataId');
    if (cellId) {
      this.onClickCell.emit(cellId);
    }
  }

  getCellWidth() {
    return this.viewportSize.width / this.width;
  }

  getCellHeight() {
    return this.viewportSize.height / this.height;
  }

  setCellWidth() {
    this.cellWidth = this.viewportSize.width / this.width;
  }

  setCellHeight() {
    this.cellHeight = this.viewportSize.height / this.height;
  }
}
