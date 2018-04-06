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
        [attr.width]="getCellWidth()"
        [attr.height]="getCellHeight()"
        [attr.x]="getXOffsetFromIndex(i) + 'px'"
        [attr.y]="getYOffsetFromIndex(i) + 'px'"
        [attr.fill]="(cell ? '#4CAF50' : '#fff')"
        (click)="onCellClick(i)"></rect>
    </svg>
  `
})
export class BoardComponent {
  @Input() gameboard;
  @Input() width: number;
  @Input() height: number;
  @Output() onClickCell = new EventEmitter();

  constructor() {}

  getXOffsetFromIndex(index) {
    return this.getCellWidth() * (index % this.width);
  }

  getYOffsetFromIndex(index) {
    return this.getCellHeight() * Math.floor(index / this.width);
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
}
