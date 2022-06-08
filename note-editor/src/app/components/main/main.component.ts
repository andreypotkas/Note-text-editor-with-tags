import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { take } from 'rxjs';
import { FormComponent } from '../form/form.component';
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
      width: '50%',
    });
    ref.onClose.pipe(take(1)).subscribe((note) => {
      if (note) {
        this.notes.push(note);
      }
    });
  }
  edit(id: number) {
    const ref = this.dialogService.open(FormComponent, {
      header: 'Edit note',
      width: '50%',
      data: {
        title: this.notes[id].title,
        description: this.notes[id].description,
      },
    });
    ref.onClose.pipe(take(1)).subscribe((note) => {
      if (note) {
        this.notes.splice(id, 1, note);
      }
    });
  }
}
