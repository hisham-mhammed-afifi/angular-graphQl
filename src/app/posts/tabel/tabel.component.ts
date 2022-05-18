import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabel',
  templateUrl: './tabel.component.html',
  styleUrls: ['./tabel.component.css'],
})
export class TabelComponent implements OnInit {
  @Input() items: any[] = [];
  @Output() onDelete = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  delete(id: any) {
    this.onDelete.emit(id);
  }
}
