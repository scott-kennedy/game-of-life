import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cgol-dimensions',
  template: `
  <input name="width"
    type="number"
    [attr.min]="validations.width.min"
    [attr.max]="validations.width.max"
    (change)="changeWidth($event)"
    (keyup)="changeWidth($event)"
    [value]="width">
<input name="height"
    type="number"
    [attr.min]="validations.height.min"
    [attr.max]="validations.height.max"
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
  validations = {
    width: {
      min: 5,
      max: 100
    },
    height: {
      min: 5,
      max: 100
    }
  };

  constructor() {}

  changeWidth(event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;
    value = this.validateInput('width', value);

    if (value) {
      this.onChangeWidth.emit(value);
    }
  }

  changeHeight(event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;
    value = this.validateInput('height', value);

    if (value) {
      this.onChangeHeight.emit(value);
    }
  }

  // TODO Convert validateInput into proper validator
  validateInput(field, value) {
    const inputValue = parseInt(value, 10);
    const inputLimits = this.validations[field];

    if (!inputValue || isNaN(inputValue)) {
      return false;
    }

    if (inputValue < inputLimits.min) {
      console.log('Returning minimum');
      return inputLimits.min;
    } else if (inputValue > inputLimits.max) {
      return inputLimits.max;
    }

    return inputValue;
  }
}
