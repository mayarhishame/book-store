import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./book/book.module').then((m) => m.BookModule),
  },
  //{
  //path: '',
  // loadChildren: () =>
  //  import('./authentacation/authentacation.module').then(
  //     (m) => m.AuthentacationModule
  //  ),
  // },
];
