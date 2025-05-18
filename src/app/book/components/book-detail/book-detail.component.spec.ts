import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailComponent } from './book-detail.component';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { Book } from '../../../models/book';
import { CommonModule } from '@angular/common';

@Pipe({ name: 'oldBook' })
class MockOldBookPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;

  const mockBook: Book = {
    id: '1',
    title: 'Test Book',
    authors: ['Author 1'],
    publisher: 'Test Publisher',
    publishedDate: '2024-01-01',
    description: 'A test book.',
    pageCount: 123,
    categories: ['Test Category'],
    imageLinks: {
      thumbnail: 'thumbnail.jpg',
      smallThumbnail: 'smallThumbnail.jpg',
    },
    language: 'en',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookDetailComponent, MockOldBookPipe],
      imports: [CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isEditing to false when goBack is called while editing', () => {
    component.isEditing = true;
    component.goBack();
    expect(component.isEditing).toBeFalse();
  });

  it('should emit backClicked when goBack is called and not editing', () => {
    spyOn(component.backClicked, 'emit');
    component.isEditing = false;
    component.goBack();
    expect(component.backClicked.emit).toHaveBeenCalled();
  });
});
