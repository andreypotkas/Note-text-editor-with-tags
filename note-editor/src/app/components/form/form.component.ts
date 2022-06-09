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
  public tagList!: string[];
  public note = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  public tags!: string[];
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
      this.tags = this.config.data.description
        .split(' ')
        .filter((item: string[]) => item[0] === '#')
        .map((item: string) => item.substring(1, item.length));
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
