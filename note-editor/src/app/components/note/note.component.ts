import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { take } from 'rxjs';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService],
})
export class NoteComponent implements OnInit {
  @Input() note!: any;
  @Input() id!: number;
  @Output() onDelete: EventEmitter<number> = new EventEmitter();
  @Output() onEdit: EventEmitter<number> = new EventEmitter();
  public title!: string;
  public description!: string;
  public tags!: string[];
  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    public confirm: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.title = this.note.title;
    this.description = this.note.description;
    this.tags = this.description
      .split(' ')
      .filter((item) => item[0] === '#')
      .map((item: string) => item.substring(1, item.length));
  }
  edit() {
    this.onEdit.emit(this.id);
  }
  delete() {
    this.confirm.confirm({
      message: 'Are you sure that you want to delete this note?',
      accept: () => {
        this.onDelete.emit(this.id);
      },
    });
  }
}
