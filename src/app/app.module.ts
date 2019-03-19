import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { DemoLibraryComponent } from './demo-library/demo-library.component';
import { UserLibraryComponent } from './user-library/user-library.component';
import { PaginationComponent } from './pagination/pagination.component';


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatTableModule} from '@angular/material';
import { UserFavouriteLibraryComponent } from './user-favourite-library/user-favourite-library.component';
import { DemoFavouriteLibraryComponent } from './demo-favourite-library/demo-favourite-library.component';


@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    DialogExampleComponent,
    DemoLibraryComponent,
    UserLibraryComponent,
    PaginationComponent,
    UserFavouriteLibraryComponent,
    DemoFavouriteLibraryComponent,
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
    MatInputModule
  ],
  entryComponents: [DialogExampleComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
