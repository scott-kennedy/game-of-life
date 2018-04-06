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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cgol-board',
  template: `
    <svg width="800px" height="600px">
      <svg:g cgol-cell *ngFor="let cell of cells" [cell]="cell"></svg:g>
    </svg>
  `
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() gameboard;
  @Input() width: number;
  @Input() height: number;
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

    if (changes.width) {
      this.setCellWidth();
      rebuildCells = true;
    }

    if (changes.height) {
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
      const cell = {
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
    const size = gameboard.length;
    for (let i = 0; i < size; i++) {
      const currentCell = this.cells[i];
      const cellChanged = gameboard[i] !== currentCell.isAlive;
      if (cellChanged) {
        this.cells[i] = Object.assign({}, this.cells[i], { isAlive: gameboard[i] });
      }
    }
  }

  getXOffsetFromIndex(index) {
    return this.cellWidth * (index % this.width);
  }

  getYOffsetFromIndex(index) {
    return this.cellHeight * Math.floor(index / this.width);
  }

  onCellClick(index) {
    this.onClickCell.emit(index);
  }

  getCellWidth() {
    return 800 / this.width;
  }

  getCellHeight() {
    return 600 / this.height;
  }

  setCellWidth() {
    this.cellWidth = 800 / this.width;
  }

  setCellHeight() {
    this.cellHeight = 600 / this.height;
  }
}
