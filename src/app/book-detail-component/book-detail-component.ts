import { Component, signal } from '@angular/core';
import { BookAPIService } from '../services/book-apiservice';
import { IBook } from '../classes/Books';

@Component({
  selector: 'app-book-detail-component',
  standalone: false,
  templateUrl: './book-detail-component.html',
  styleUrl: './book-detail-component.css',
})
export class BookDetailComponent {
  book = signal<IBook | null>(null);
  errMessage = signal('');
  server_images_link = 'http://localhost:3000/images/';
  constructor(private _service: BookAPIService) {}
  searchBook(bookId: string) {
    this.book.set(null);
    this.errMessage.set('');
    this._service.getBooks().subscribe({
      next: (data) => {
        const foundBook = data.find((b: IBook) => b.BookId === bookId);
        this.book.set(foundBook || null);
      },
      error: (err) => {
        this.errMessage.set(err);
      },
    });
  }
}
