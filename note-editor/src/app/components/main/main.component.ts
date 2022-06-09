import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { take } from 'rxjs';
import { FormComponent } from '../form/form.component';
import { NoteModalComponent } from '../note-modal/note-modal.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService],
})
export class MainComponent implements OnInit {
  public notes!: any;

  constructor(
    public http: HttpClient,
    public dialogService: DialogService,
    public messageService: MessageService,
    public confirm: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.http.get('../../../assets/data.json').subscribe((data: any) => {
      this.notes = data;
    });
  }
  delete(id: number) {
    this.notes.splice(id, 1);
  }
  add() {
    const ref = this.dialogService.open(FormComponent, {
      header: 'Create note',
    });
    ref.onClose.pipe(take(1)).subscribe((note) => {
      if (note) {
        note.tags = [];
        note.description = note.description
          .split(' ')
          .map((item: string) => {
            if (item[0] === '#') {
              item = item.replace(/[^A-Za-zА-Яа-я0-9]/g, '');
              note.tags.push(item);
            }
            return item;
          })
          .join(' ');
        this.notes.push(note);
      }
    });
  }
  edit(id: number) {
    const ref = this.dialogService.open(FormComponent, {
      header: 'Edit note',
      data: {
        title: this.notes[id].title,
        description: this.notes[id].description,
        tags: this.notes[id].tags,
      },
    });
    ref.onClose.pipe(take(1)).subscribe((note) => {
      if (note) {
        note.description = note.description
          .split(' ')
          .map((item: string) => {
            if (item[0] === '#') {
              item = item.replace(/[^A-Za-zА-Яа-я0-9]/g, '');
              note.tags.push(item);
            }
            return item;
          })
          .join(' ');
        this.notes.splice(id, 1, note);
      }
    });
  }
  show(id: number) {
    const ref = this.dialogService.open(NoteModalComponent, {
      header: `${this.notes[id].title}`,
      data: {
        title: this.notes[id].title,
        description: this.notes[id].description,
        tags: this.notes[id].tags,
      },
    });
  }
}
