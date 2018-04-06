import 'hammerjs';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule, MatListModule, MatSliderModule } from '@angular/material';

import { GameService } from './services/game.service';

// Importing Containers
import { AppComponent } from './containers/app';
import { BoardModule } from '../board/board.module';

// Importing Components
import { LayoutComponent } from './components/layout';
import { SidenavComponent } from './components/sidenav';
import { NavItemComponent } from './components/nav-item';
import { DimensionsComponent } from './components/dimension-inputs';

const COMPONENTS = [
  AppComponent,
  LayoutComponent,
  SidenavComponent,
  NavItemComponent,
  DimensionsComponent
];

@NgModule({
  imports: [CommonModule, MatSidenavModule, MatListModule, MatSliderModule, BoardModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {
  public static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [GameService]
    };
  }
}
