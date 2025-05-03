import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Book } from '../../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private api = 'https://reactnd-books-api.udacity.com';
  private headers = new HttpHeaders({
    Accept: 'application/json',
  });

  constructor(private http: HttpClient) {}

  getBook(bookId: string): Observable<Book> {
    return this.http
      .get<{ book: Book }>(`${this.api}/books/${bookId}`, {
        headers: this.headers,
      })
      .pipe(
        retry(2),
        map((res) => res.book),
        catchError(this.handleError)
      );
  }

  getAllBooks(): Observable<Book[]> {
    return this.http
      .get<{ books: Book[] }>(`${this.api}/books`, { headers: this.headers })
      .pipe(
        retry(2),
        map((res) => res.books),
        catchError(this.handleError)
      );
  }

  updateBook(book: Book, shelf: string): Observable<any> {
    const body = JSON.stringify({ shelf });
    const headers = this.headers.set('Content-Type', 'application/json');
    return this.http
      .put(`${this.api}/books/${book.id}`, body, { headers })
      .pipe(retry(2), catchError(this.handleError));
  }

  addBook(book: Book): Observable<any> {
    const headers = this.headers.set('Content-Type', 'application/json');
    return this.http
      .post(`${this.api}/books`, book, { headers })
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteBook(bookId: string): Observable<any> {
    return this.http
      .delete(`${this.api}/books/${bookId}`, { headers: this.headers })
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('HTTP Error:', error);
    return throwError(
      () => new Error('Something went wrong with the HTTP request')
    );
  }
}
