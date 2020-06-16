import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SideBarComponent} from './sidebar/app-sidebar.component';
import { PreLoaderComponent } from './pre-loader/app-pre-loader.component';

//Own Components
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideBarComponent,
    PreLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
