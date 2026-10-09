import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  standalone: false,
  templateUrl: './parent.html',
  styleUrl: './parent.css',
})
export class Parent {
  data = 'Sample Text';
  dataFromChild: any;

  getDataFromChild(data: any): void {
    this.dataFromChild = data;
  }
}
