import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NewsListingComponent } from './news-listing/news-listing.component';
import { NewsComponent } from './news/news.component';
import { LoadingComponent } from './loading/loading.component';
import { DataService } from './services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { LoaderInterceptor } from './loader.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmptyCardComponent } from './empty-card/empty-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsListingComponent,
    NewsComponent,
    LoadingComponent,
    EmptyCardComponent,
  ],
  imports: [
    BrowserModule,
    NgMaterialModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
  ],
  providers: [DataService, LoaderInterceptor],
  bootstrap: [AppComponent],
})
export class AppModule {}
