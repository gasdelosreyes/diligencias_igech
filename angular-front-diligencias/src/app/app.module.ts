import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DestinataryComponent } from './components/destinatary/destinatary.component';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


//Own Components
@NgModule({
  declarations: [
    AppComponent,
    DestinataryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
