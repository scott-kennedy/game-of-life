import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BoardPageComponent } from './containers/board-page';

import { CellComponent } from './components/cell';

import { GameEffects } from './effects/game';

const COMPONENTS = [BoardPageComponent, CellComponent];

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([GameEffects])],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class BoardModule {}
