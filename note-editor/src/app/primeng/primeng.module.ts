import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ToastModule,
    ConfirmDialogModule,
  ],
})
export class PrimengModule {}
