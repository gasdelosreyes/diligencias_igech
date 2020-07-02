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
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { ListDestinataryComponent } from './components/destinatary/list-destinatary/list-destinatary.component';
import { ListCourtsComponent } from './components/list-courts/list-courts.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,    
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,    
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ListDestinataryComponent,
    ListCourtsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
