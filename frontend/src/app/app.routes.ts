import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"players",
        loadChildren:()=>import("./modules/players/players.module").then(m=>m.PlayersModule)
     }
];
