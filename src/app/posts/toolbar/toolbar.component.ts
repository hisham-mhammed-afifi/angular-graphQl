import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  @Input() pages: number[] = [];
  @Output() onPrev = new EventEmitter();
  @Output() onNext = new EventEmitter();
  @Output() onChangePage = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  prev() {
    this.onPrev.emit();
  }
  next() {
    this.onNext.emit();
  }

  paginate(page: number) {
    this.onChangePage.emit(page);
  }
}
