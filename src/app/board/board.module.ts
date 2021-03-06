import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { BoardPageComponent } from './containers/board-page';

import { BoardComponent } from './components/board';
import { CellComponent } from './components/cell';

import { GameEffects } from './effects/game';

const COMPONENTS = [BoardPageComponent, BoardComponent, CellComponent];

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([GameEffects])],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BoardModule {}
