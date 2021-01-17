import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { ListDestinataryComponent } from '../../destinatary/list-destinatary/list-destinatary.component';
import { TypographyComponent } from '../../typography/typography.component';
import { DestinataryComponent } from '../../destinatary/destinatary.component';
import { FormCourtsComponent } from '../../court/form-courts/form-courts.component';
import { ListCourtsComponent } from '../../court/list-courts/list-courts.component';
import { ListRecordComponent } from '../../record/list-record/list-record.component';
import { ListOfficesComponent } from '../../office/list-offices/list-offices.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: HomeComponent },
    { path: 'usuarios', component: UserComponent },
    { path: 'destinos', component: ListDestinataryComponent },
    { path: 'expedientes', component: ListRecordComponent },
    { path: 'expedientes/:recordId/oficios', component: ListOfficesComponent },
    { path: 'destinos/crear', component: DestinataryComponent },
    { path: 'destinos/editar/:destinataryId', component: DestinataryComponent },
    { path: 'juzgados',  component: ListCourtsComponent },
    { path: 'juzgados/crear',  component: FormCourtsComponent },
    { path: 'juzgados/editar/:courtId',  component: FormCourtsComponent }
];
