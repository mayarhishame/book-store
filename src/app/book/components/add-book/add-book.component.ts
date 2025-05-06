import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { NgForm } from '@angular/forms';
import { Book } from '../../../models/book';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  standalone: false,
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  book: Book = {
    id: '',
    title: '',
    authors: [],
    publisher: '',
    publishedDate: '',
    description: '',
    pageCount: 0,
    categories: [],
    imageLinks: {
      thumbnail: '',
      smallThumbnail: '',
    },
    language: '',
  };

  constructor(private bookService: BookService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.bookService.addBook(this.book).subscribe({
        next: () => {
          Swal.fire({
            title: 'Good job!',
            text: 'Book added successfully!',
            icon: 'success',
          }).then(() => {
            this.bookService.getAllBooks().subscribe();
            this.router.navigate(['/books']);
          });
        },
        error: (err) =>
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!' + err.message,
            footer: '<a href="#">Why do I have this issue?</a>',
          }),
      });
    }
  }
}
