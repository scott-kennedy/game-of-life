1. Cell building is a candidate to move into a store
2. Cell updating is a candidate to move into a store
3. Convert validateInput function into a proper validator
4. Debouncing input might make the experience smoother
5. Create a store/reducer for page layout and control the viewport size there and then fetch the data within AppComponent instead of doing all the heavy lifting there
6. Address delays when toggling cells using largers grids
  * Drawing a lot to the screen so that's the bulk of the work
7. General cleanup of styles, right now just prototyped some CSS so things would be presentable but requires cleanup