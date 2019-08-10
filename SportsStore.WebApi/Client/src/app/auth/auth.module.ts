import { AuthentitcationGuard } from './authentucation.guard';
import { AuthenticationService } from './authentication.service';
import { AuthenticationComponent } from './authentication.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule, FormsModule, BrowserModule],
  declarations: [AuthenticationComponent],
  providers: [AuthenticationService, AuthentitcationGuard],
  exports: [AuthenticationComponent]
})
export class AuthModule{}
