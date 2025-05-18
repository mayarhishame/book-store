import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookService } from './book.service';
import { Book } from '../../models/book';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  const dummyBook: Book = {
    id: '1',
    title: 'Test Book',
    authors: ['Author A'],
    publisher: 'Publisher',
    publishedDate: '2024-01-01',
    description: 'Description',
    pageCount: 123,
    categories: ['Fiction'],
    imageLinks: {
      thumbnail: 'url',
      smallThumbnail: 'small-url',
    },
    language: 'en',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a book by id', (done: DoneFn) => {
    service.getBook('1').subscribe((book: Book) => {
      expect(book).toEqual(dummyBook);
      done();
    });

    const req = httpMock.expectOne(
      'https://reactnd-books-api.udacity.com/books/1'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ book: dummyBook });
  });

  it('should get all books', (done: DoneFn) => {
    const books: Book[] = [dummyBook];
    service.getAllBooks().subscribe((res: Book[]) => {
      expect(res.length).toBe(1);
      expect(res).toEqual(books);
      done();
    });

    const req = httpMock.expectOne(
      'https://reactnd-books-api.udacity.com/books'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ books });
  });

  it('should update a book', (done: DoneFn) => {
    service.updateBook(dummyBook, 'currentlyReading').subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne(
      'https://reactnd-books-api.udacity.com/books/1'
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toContain('Test Book');
    req.flush({});
  });

  it('should add a book', (done: DoneFn) => {
    service.addBook(dummyBook).subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne(
      'https://reactnd-books-api.udacity.com/books'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body.title).toBe('Test Book');
    req.flush({});
  });

  it('should delete a book', (done: DoneFn) => {
    service.deleteBook('1').subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne(
      'https://reactnd-books-api.udacity.com/books/1'
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
