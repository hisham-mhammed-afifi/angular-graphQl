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
  @Output() onSearch = new EventEmitter();

  currentPage = 1;

  constructor() {}

  ngOnInit(): void {}

  prev() {
    this.currentPage--;
    this.onPrev.emit();
  }
  next() {
    this.currentPage++;
    this.onNext.emit();
  }

  paginate(page: number) {
    this.onChangePage.emit(page);
    this.currentPage = page;
  }

  search(e: Event) {
    this.onSearch.emit((e.target as HTMLInputElement).value);
  }
}
