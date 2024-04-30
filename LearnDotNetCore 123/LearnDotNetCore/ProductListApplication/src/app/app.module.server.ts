import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { JsonPipe, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    NgFor,
    ReactiveFormsModule,
    JsonPipe
   ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
