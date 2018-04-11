import { Component } from '@angular/core';

@Component({
  selector: 'cgol-layout',
  template: `
    <ng-content></ng-content>
  `
})
export class LayoutComponent {
  // TODO Create store for page layout and calculate the viewport height/width here
  // and then fetch that data from the store in the AppComponent to pass on to its children
}
