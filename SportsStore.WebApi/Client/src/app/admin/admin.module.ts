import { OrderAdminComponent } from './orderAdmin.component';
import { ProductAdminComponent } from './productAdmin.component';
import { OverviewComponent } from './overview.component';
import { AdminComponent } from './admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, RouterModule, FormsModule],
  declarations: [AdminComponent, OverviewComponent, ProductAdminComponent, OrderAdminComponent]
})
export class AdminModule{}
