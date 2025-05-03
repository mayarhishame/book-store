import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../../models/book';

@Component({
  selector: 'app-edit-book',
  standalone: false,
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent {
  @Input() bookToEdit!: Book;

  bookForm!: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService) {}

  ngOnInit(): void {
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

    if (this.bookToEdit) {
      this.bookForm.patchValue({
        title: this.bookToEdit.title,
        authors: this.bookToEdit.authors?.join(', '),
        publisher: this.bookToEdit.publisher,
        publishedDate: this.bookToEdit.publishedDate,
        description: this.bookToEdit.description,
        pageCount: this.bookToEdit.pageCount,
        categories: this.bookToEdit.categories?.join(', '),
        thumbnail: this.bookToEdit.imageLinks?.thumbnail || '',
        language: this.bookToEdit.language,
      });
    }
  }

  submitBook() {
    if (this.bookForm.valid) {
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
        next: () => alert('Book updated!'),
        error: (err) => alert(err.message),
      });
    } else {
      this.bookForm.markAllAsTouched();
    }
  }
}
