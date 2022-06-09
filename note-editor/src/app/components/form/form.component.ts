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
      this.tags = this.config.data.tags;
    }
  }
  public get title(): AbstractControl {
    return this.note.get('title') as AbstractControl;
  }
  public get description(): AbstractControl {
    return this.note.get('description') as AbstractControl;
  }

  create() {
    this.ref.close({
      title: this.title.value,
      description: this.description.value,
      tags: this.tags,
    });
  }
  deleteTag(tag: string) {
    this.description.setValue(
      this.description.value
        .split(' ')
        .map((item: string) => {
          if (item === `#${tag}`) {
            return tag;
          }
          return item;
        })
        .join(' ')
    );
    this.tags = this.tags.filter((item) => item !== tag);
  }
}
