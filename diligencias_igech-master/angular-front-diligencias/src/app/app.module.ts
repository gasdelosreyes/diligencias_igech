import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './components/shared/navbar/navbar.module';
import { FooterModule } from './components/shared/footer/footer.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import {MatTableModule} from '@angular/material/table';



import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { ListDestinataryComponent } from './components/destinatary/list-destinatary/list-destinatary.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    // DataTablesModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ListDestinataryComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
