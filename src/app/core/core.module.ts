import 'hammerjs';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdSidenavModule, MdListModule, MdSliderModule } from '@angular/material';

import { GameService } from './services/game.service';

// Importing Containers
import { AppComponent } from './containers/app';
import { BoardModule } from '../board/board.module';

// Importing Components
import { LayoutComponent } from './components/layout';
import { SidenavComponent } from './components/sidenav';
import { NavItemComponent } from './components/nav-item';

const COMPONENTS = [AppComponent, LayoutComponent, SidenavComponent, NavItemComponent];

@NgModule({
  imports: [CommonModule, MdSidenavModule, MdListModule, MdSliderModule, BoardModule],
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
