import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBookComponent } from './edit-book.component';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

// Create mock services
const mockBookService = jasmine.createSpyObj('BookService', [
  'getBook',
  'updateBook',
]);
const mockActivatedRoute = {
  paramMap: of({
    get: (key: string) => 'test-book-id',
  }),
};
const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('EditBookComponent', () => {
  let component: EditBookComponent;
  let fixture: ComponentFixture<EditBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBookComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: BookService, useValue: mockBookService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;

    // Provide mock return value for getBook
    mockBookService.getBook.and.returnValue(
      of({
        id: 'test-book-id',
        title: 'Test Book',
        authors: ['Author 1'],
        publisher: 'Test Publisher',
        publishedDate: '2023-01-01',
        description: 'A test book.',
        pageCount: 100,
        categories: ['Fiction'],
        imageLinks: { thumbnail: 'http://example.com/image.jpg' },
        language: 'en',
      })
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
