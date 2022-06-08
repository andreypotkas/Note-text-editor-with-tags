import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public note = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    if (this.config.data) {
      this.note.setValue({
        title: this.config.data.title,
        description: this.config.data.description,
      });
    }
  }
  public get title(): AbstractControl {
    return this.note.get('title') as AbstractControl;
  }
  public get description(): AbstractControl {
    return this.note.get('description') as AbstractControl;
  }

  create() {
    this.ref.close(this.note.value);
  }
}
