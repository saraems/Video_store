import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { VideoSearchComponent } from './video-search/video-search.component';
import { VideoDialogComponent } from './video-dialog/video-dialog.component';
import { LibraryComponent } from './library/library.component';


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatTableModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    VideoSearchComponent,
    VideoDialogComponent,
    LibraryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule,
    MatSortModule
  ],
  entryComponents: [VideoDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
