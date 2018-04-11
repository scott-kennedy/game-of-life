import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cgol-dimensions',
  template: `
  <input name="width"
    type="number"
    [disabled]="disableInputs"
    [class.md-inactive]="disableInputs"
    [attr.min]="validations.width.min"
    [attr.max]="validations.width.max"
    [ngModel]="width"
    (ngModelChange)="changeWidth($event)">
  <input name="height"
    type="number"
    [disabled]="disableInputs"
    [class.md-inactive]="disableInputs"
    [attr.min]="validations.height.min"
    [attr.max]="validations.height.max"
    [ngModel]="height"
    (ngModelChange)="changeHeight($event)">
  `
})
export class DimensionsComponent {
  @Input() width: number;
  @Input() height: number;
  @Input() disableInputs: boolean;
  @Output() onChangeWidth = new EventEmitter();
  @Output() onChangeHeight = new EventEmitter();

  validations = {
    width: {
      min: 5,
      max: 50
    },
    height: {
      min: 5,
      max: 50
    }
  };

  constructor() {}

  changeWidth(value: number): void {
    value = this.validateInput('width', value);

    if (value) {
      this.onChangeWidth.emit(value);
    }
  }

  changeHeight(value: number): void {
    value = this.validateInput('height', value);

    if (value) {
      this.onChangeHeight.emit(value);
    }
  }

  // TODO Convert validateInput into proper validator
  // TODO Debounce input could make the input smoother but not true real-time
  validateInput(field, value): number {
    const inputValue = parseInt(value, 10);
    const inputLimits = this.validations[field];

    if (!inputValue || isNaN(inputValue)) {
      return null;
    }

    // Still do unnecessary update when you use an invalid value, ex: 2 is below the minimum of 5 so
    // 2 !== 5 even though we return 5 from this function.
    if (this[field] === value) {
      return null;
    }

    if (inputValue < inputLimits.min) {
      return inputLimits.min;
    } else if (inputValue > inputLimits.max) {
      return inputLimits.max;
    }

    return inputValue;
  }
}
