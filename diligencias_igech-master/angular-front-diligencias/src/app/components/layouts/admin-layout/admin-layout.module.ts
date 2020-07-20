import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LbdModule } from '../../lbd/lbd.module';
//import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';

import { TypographyComponent } from '../../typography/typography.component';
import {DestinataryComponent} from '../../destinatary/destinatary.component';
import { FormCourtsComponent } from '../../court/form-courts/form-courts.component';
import { FormSecretaryComponent } from '../../secretary/form-secretary/form-secretary.component';
import { FormRecordComponent } from '../../record/form-record/form-record.component';
import { ListRecordComponent } from 'app/components/record/list-record/list-record.component';
import { ListSecretaryComponent } from '../../secretary/list-secretary/list-secretary.component';
import { ListDestinataryComponent } from '../../destinatary/list-destinatary/list-destinatary.component';
import { ListCourtsComponent } from '../../court/list-courts/list-courts.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    LbdModule
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    TypographyComponent,
    DestinataryComponent,
    FormCourtsComponent,
    FormSecretaryComponent,
    FormRecordComponent,
    ListRecordComponent,
    ListSecretaryComponent,
    ListDestinataryComponent,
    ListCourtsComponent
  ]
})

export class AdminLayoutModule {}
