import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { authGuard } from '../guards/auth.guard';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { HelpPageComponent } from './components/help-page/help-page.component';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'add-book', component: AddBookComponent, canActivate: [authGuard] },
  { path: 'edit/:id', component: EditBookComponent, canActivate: [authGuard] },
  { path: 'help', component: HelpPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
