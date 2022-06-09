import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

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
  @Output() onShow: EventEmitter<number> = new EventEmitter();
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
    this.tags = this.note.tags;
  }
  edit() {
    this.onEdit.emit(this.id);
  }
  show() {
    this.onShow.emit(this.id);
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
