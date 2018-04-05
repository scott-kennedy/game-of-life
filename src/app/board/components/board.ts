import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cgol-board',
  template: `
    <svg width="800px" height="100%">
      <rect *ngFor="let cell of gameboard; let i=index"
        stroke="black"
        [attr.width]="cellWidth"
        [attr.height]="cellHeight"
        [attr.x]="getXOffsetFromIndex(i) + 'px'"
        [attr.y]="getYOffsetFromIndex(i) + 'px'"
        [attr.fill]="(cell ? '#4CAF50' : '#fff')"></rect>
    </svg>
  `
})
export class BoardComponent implements OnInit {
  @Input() gameboard;
  @Input() width: number;
  @Input() height: number;
  cellWidth: number;
  cellHeight: number;

  constructor() {}

  ngOnInit() {
    this.cellWidth = 800 / this.width;
    this.cellHeight = 600 / this.height;
  }

  getXOffsetFromIndex(index) {
    return this.cellWidth * (index % this.width);
  }

  getYOffsetFromIndex(index) {
    return this.cellHeight * (index - index % this.width) / this.height;
  }
}
