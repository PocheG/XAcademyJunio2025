import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadChildren: () =>
        import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
      path: 'players',
      loadChildren: () =>
        import('./modules/players/players.module').then(m => m.PlayersModule)
    }
  ];