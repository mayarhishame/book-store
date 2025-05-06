import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../../models/book';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-book',
  standalone: false,
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent implements OnInit {
  bookForm!: FormGroup;
  bookId!: string;
  bookToEdit!: Book;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.bookId = id;
        this.loadBook(id);
      }
    });
  }

  initForm() {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      authors: [''],
      publisher: ['', Validators.required],
      publishedDate: ['', Validators.required],
      description: ['', Validators.required],
      pageCount: [0, [Validators.required, Validators.min(1)]],
      categories: [''],
      thumbnail: [''],
      language: ['', Validators.required],
    });
  }

  loadBook(id: string) {
    this.bookService.getBook(id).subscribe({
      next: (book) => {
        this.bookToEdit = book;
        this.bookForm.patchValue({
          title: book.title,
          authors: book.authors?.join(', '),
          publisher: book.publisher,
          publishedDate: book.publishedDate,
          description: book.description,
          pageCount: book.pageCount,
          categories: book.categories?.join(', '),
          thumbnail: book.imageLinks?.thumbnail || '',
          language: book.language,
        });
      },
      error: (err) => {
        Swal.fire('Error', 'Failed to load book. ' + err.message, 'error');
        this.router.navigate(['/']);
      },
    });
  }

  submitBook() {
    if (this.bookForm.valid && this.bookToEdit) {
      const bookData = this.bookForm.value;
      const updatedBook: Book = {
        ...this.bookToEdit,
        ...bookData,
        authors:
          bookData.authors?.split(',').map((a: string) => a.trim()) || [],
        categories:
          bookData.categories?.split(',').map((c: string) => c.trim()) || [],
        imageLinks: {
          thumbnail: bookData.thumbnail,
        },
      };

      this.bookService.updateBook(updatedBook, 'currentlyReading').subscribe({
        next: () => {
          Swal.fire({
            title: 'Updated!',
            text: 'Book updated successfully!',
            icon: 'success',
          }).then(() => {
            this.router.navigate(['/']);
          });
        },
        error: (err) =>
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! ' + err.message,
          }),
      });
    } else {
      this.bookForm.markAllAsTouched();
    }
  }
}
