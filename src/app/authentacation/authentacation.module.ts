import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { authentacationRoutingModule } from './authentacation.routes';

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [CommonModule, FormsModule, authentacationRoutingModule],
  exports: [AuthComponent, LoginComponent],
})
export class AuthentacationModule {}
