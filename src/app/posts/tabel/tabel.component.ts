import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabel',
  templateUrl: './tabel.component.html',
  styleUrls: ['./tabel.component.css'],
})
export class TabelComponent implements OnInit {
  @Input() items: any[] = [];
  @Output() onDelete = new EventEmitter();
  @Output() onUpdate = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  delete(item: any) {
    this.onDelete.emit(item.id);
  }

  update(item: any) {
    this.onUpdate.emit(item);
  }
}
