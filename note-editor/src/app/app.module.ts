import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimengModule } from './primeng/primeng.module';
import { ButtonModule } from 'primeng/button';
import { MainComponent } from './components/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteComponent } from './components/note/note.component';
import { FormComponent } from './components/form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';
import { CutPipe } from './pipes/cut.pipe';
import { NoteModalComponent } from './components/note-modal/note-modal.component';

@NgModule({
  declarations: [AppComponent, MainComponent, NoteComponent, FormComponent, FilterPipe, CutPipe, NoteModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    BrowserAnimationsModule,
    ButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
