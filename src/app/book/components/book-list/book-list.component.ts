import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../authentacation/services/auth.service';
import { Router } from '@angular/router';
import { BookModule } from '../../book.module';
import { Book } from '../../../models/book';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  books: Book[] = [];
  selectedBook: any = null;
  isAuthenticated = false;

  constructor(
    private bookService: BookService,
    private auth: AuthService,
    private router: Router
  ) {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe((data) => {
      this.books = data;
    });
  }

  showDetails(book: any): void {
    this.selectedBook = book;
  }

  clearSelection(): void {
    this.selectedBook = null;
  }
  checkAuth() {
    this.isAuthenticated = this.auth.getUserLogged();
  }
}
