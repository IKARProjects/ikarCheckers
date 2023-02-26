import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckerBoardComponent } from './component/checker-board/checker-board.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WinnerDialogComponent } from './winner-dialog/winner-dialog.component';
import {MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    CheckerBoardComponent,
    WinnerDialogComponent
  ],
  imports: [
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
