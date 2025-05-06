import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { BookService } from '../../services/book.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
describe('BookListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent],
      providers: [BookService, HttpClient, HttpHandler],
      imports: [FormsModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BookListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
