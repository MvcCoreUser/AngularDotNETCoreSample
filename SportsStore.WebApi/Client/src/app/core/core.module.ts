import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RepositoryModelModule } from '../model/model.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule, RepositoryModelModule, RouterModule],
  declarations: [HomeComponent],
  providers: [],
  exports: [HomeComponent]
})
export class CoreModule{}
