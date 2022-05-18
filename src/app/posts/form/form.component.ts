import {
  Component,
  EventEmitter,
  Input,
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
  @Input() item: any = {};

  @Output() onSubmit = new EventEmitter();

  constructor() {
    this.editor = new Editor();
  }

  ngOnInit(): void {}

  submit(form: any) {
    if (this.item.id) {
      this.onSubmit.emit({ ...this.item, ...form.value });
    } else {
      this.onSubmit.emit(form.value);
    }
    form.resetForm();
    this.item = { title: '', body: '' };
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
