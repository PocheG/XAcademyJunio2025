import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersListComponent } from './players-list/players-list.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { EditPlayerComponent } from './edit-player/edit-player.component';
import { NewPlayerComponent } from './new-player/new-player.component';

const routes: Routes = [
  {path:"", component:PlayersListComponent,},
  {path:"detail/:id", component: PlayerDetailComponent, pathMatch:"prefix"},
  {path:"edit/:id", component:EditPlayerComponent, pathMatch:"prefix"},
  {path:"new-player", component:NewPlayerComponent, pathMatch:"prefix"}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule { }
