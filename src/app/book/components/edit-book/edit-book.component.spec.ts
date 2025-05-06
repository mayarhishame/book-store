import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBookComponent } from './edit-book.component';
import { BookService } from '../../services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditBookComponent', () => {
  let fixture: ComponentFixture<EditBookComponent>;
  let component: EditBookComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBookComponent],
      providers: [BookService],
      imports: [ReactiveFormsModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
