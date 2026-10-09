import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: false,
  templateUrl: './child.html',
  styleUrl: './child.css',
})
export class Child {
  @Input('parentData') data: any;

  @Output() childEvent = new EventEmitter<any>();

  sendData(): void {
    let beerInfo = {
      name: 'Heniken',
      price: 19000,
    };

    this.childEvent.emit(beerInfo);
  }
}
