import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cgol-dimensions',
  template: `
  <input name="width"
    type="number"
    min="1"
    max="100"
    (change)="changeWidth($event)"
    (keyup)="changeWidth($event)"
    [value]="width">
<input name="height"
    type="number"
    min="1"
    max="100"
    (change)="changeHeight($event)"
    (keyup)="changeHeight($event)"
    [value]="height">
  `
})
export class DimensionsComponent {
  @Input() width: number;
  @Input() height: number;
  @Output() onChangeWidth = new EventEmitter();
  @Output() onChangeHeight = new EventEmitter();

  constructor() {}

  changeWidth(event: KeyboardEvent) {
    const inputValue = (<HTMLInputElement>event.target).value;
    if (!inputValue) {
      return;
    }
    this.onChangeWidth.emit(inputValue);
  }

  changeHeight(event: KeyboardEvent) {
    const inputValue = (<HTMLInputElement>event.target).value;
    if (!inputValue) {
      return;
    }
    this.onChangeHeight.emit(inputValue);
  }
}
