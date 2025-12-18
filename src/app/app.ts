import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DynamicDialogModule, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
