import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
// import { TablesComponent } from '../../tables/tables.component';
import { ListDestinataryComponent } from '../../destinatary/list-destinatary/list-destinatary.component';
import { TypographyComponent } from '../../typography/typography.component';
import {DestinataryComponent} from '../../destinatary/destinatary.component';
import {CourtComponent} from '../../court/court.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    // ListDestinataryComponent,
    // TablesComponent,
    TypographyComponent,
    DestinataryComponent,
    CourtComponent
  ]
})

export class AdminLayoutModule {}