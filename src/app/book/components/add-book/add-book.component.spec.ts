import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AddBookComponent } from './add-book.component';
import { BookService } from '../../services/book.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AddBookComponent', () => {
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;
  let bookServiceSpy: jasmine.SpyObj<BookService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BookService', ['addBook']);
    await TestBed.configureTestingModule({
      declarations: [AddBookComponent],
      imports: [FormsModule],
      providers: [
        { provide: BookService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBookComponent);
    component = fixture.componentInstance;
    bookServiceSpy = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addBook on valid form submit', () => {
    bookServiceSpy.addBook.and.returnValue(of({}));
    const mockForm = {
      valid: true,
    } as NgForm;
    component.onSubmit(mockForm);
    expect(bookServiceSpy.addBook).toHaveBeenCalledWith(component.book);
  });
});
