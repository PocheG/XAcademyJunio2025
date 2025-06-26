import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersListComponent } from './players-list/players-list.component';
import { ComponentModule } from '../../components/component.index';
import { PlayerDetailComponent } from './player-detail/player-detail.component';


@NgModule({
  declarations: [PlayersListComponent, PlayerDetailComponent],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    ComponentModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlayersModule { }
