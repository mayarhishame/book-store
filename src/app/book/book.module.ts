import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BookRoutingModule } from './book.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddBookComponent } from './components/add-book/add-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { OldBookPipe } from './pipes/old-book.pipe';
import { AuthentacationModule } from '../authentacation/authentacation.module';

@NgModule({
  declarations: [
    BookDetailComponent,
    BookListComponent,
    AddBookComponent,
    EditBookComponent,
  ],
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BookRoutingModule,
    ReactiveFormsModule,
    OldBookPipe,
    AuthentacationModule,
  ],
  exports: [
    BookListComponent,
    BookDetailComponent,
    AddBookComponent,
    EditBookComponent,
  ],
})
export class BookModule {}
