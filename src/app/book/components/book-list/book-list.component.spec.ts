import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BookListComponent } from './book-list.component';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../../authentacation/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Book } from '../../../models/book';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  // Mock data
  const mockBooks: Book[] = [
    {
      id: '1',
      title: 'Book 1',
      authors: ['Author 1'],
      publisher: 'Publisher 1',
      publishedDate: '2023-01-01',
      description: 'Description 1',
      pageCount: 100,
      categories: ['Category 1'],
      imageLinks: {
        thumbnail: 'thumbnail-url',
        smallThumbnail: 'small-thumbnail-url',
      },
      language: 'en',
    },
    {
      id: '2',
      title: 'Book 2',
      authors: ['Author 2'],
      publisher: 'Publisher 2',
      publishedDate: '2022-01-01',
      description: 'Description 2',
      pageCount: 200,
      categories: ['Category 2'],
      imageLinks: {
        thumbnail: 'thumbnail-url-2',
        smallThumbnail: 'small-thumbnail-url-2',
      },
      language: 'en',
    },
  ];

  const bookServiceMock = {
    getAllBooks: jasmine
      .createSpy('getAllBooks')
      .and.returnValue(of(mockBooks)),
  };

  const authServiceMock = {
    getUserLogged: jasmine.createSpy('getUserLogged').and.returnValue(true),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent],
      imports: [FormsModule],
      providers: [
        { provide: BookService, useValue: bookServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load books on creation', () => {
    component.loadBooks();
    expect(bookServiceMock.getAllBooks).toHaveBeenCalled();
    expect(component.books.length).toBe(2);
    expect(component.books).toEqual(mockBooks);
  });

  it('should show details of selected book', () => {
    const book = mockBooks[0];
    component.showDetails(book);
    expect(component.selectedBook).toEqual(book);
  });

  it('should clear selected book', () => {
    component.selectedBook = mockBooks[0];
    component.clearSelection();
    expect(component.selectedBook).toBeNull();
  });

  it('should set isAuthenticated on checkAuth()', () => {
    component.isAuthenticated = false;
    component.checkAuth();
    expect(authServiceMock.getUserLogged).toHaveBeenCalled();
    expect(component.isAuthenticated).toBeTrue();
  });
});
