import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  editor: Editor;

  @Output() onSubmit = new EventEmitter();

  constructor() {
    this.editor = new Editor();
  }

  ngOnInit(): void {}

  submit(e: any) {
    this.onSubmit.emit(e.value);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
