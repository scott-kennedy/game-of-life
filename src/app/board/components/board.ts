import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cgol-board',
  template: `
    <svg width="800px" height="600px">
      <rect *ngFor="let cell of gameboard; let i=index"
        stroke="black"
        [attr.width]="cellWidth"
        [attr.height]="cellHeight"
        [attr.x]="getXOffsetFromIndex(i) + 'px'"
        [attr.y]="getYOffsetFromIndex(i) + 'px'"
        [attr.fill]="(cell ? '#4CAF50' : '#fff')"
        (click)="onCellClick(i)"></rect>
    </svg>
  `
})
export class BoardComponent implements OnInit {
  @Input() gameboard;
  @Input() width: number;
  @Input() height: number;
  @Output() onClickCell = new EventEmitter();
  cellWidth: number;
  cellHeight: number;

  constructor() {}

  ngOnInit() {
    this.cellWidth = 800 / this.width;
    this.cellHeight = 600 / this.height;
    console.log('cellHeight:', this.cellHeight);
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
}
