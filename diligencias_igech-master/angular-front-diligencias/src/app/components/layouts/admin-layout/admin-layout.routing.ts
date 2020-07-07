import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { ListDestinataryComponent } from '../../destinatary/list-destinatary/list-destinatary.component';
import { TypographyComponent } from '../../typography/typography.component';
import { DestinataryComponent } from '../../destinatary/destinatary.component';
import { FormCourtsComponent } from '../../court/form-courts/form-courts.component';
import { ListCourtsComponent } from '../../court/list-courts/list-courts.component';
import { FormSecretaryComponent } from '../../secretary/form-secretary/form-secretary.component';
import { ListSecretaryComponent } from '../../secretary/list-secretary/list-secretary.component';
import { LoginComponent } from '../../layouts/auth/login/login.component'; 
// importamos para la autenticacion de usuarios
// import {AuthGuard} from '../../shared/guards/auth.guard';


export const AdminLayoutRoutes: Routes = [   

    { path: 'destinos', component: ListDestinataryComponent },
    { path: 'expedientes', component: TypographyComponent },
    { path: 'destinos/crear', component: DestinataryComponent },
    { path: 'destinos/editar/:destinataryId', component: DestinataryComponent },
    { path: 'juzgados',  component: ListCourtsComponent },
    { path: 'juzgados/crear',  component: FormCourtsComponent },
    { path: 'juzgados/editar/:courtId',  component: FormCourtsComponent },
    { path: 'juzgados/editar/:courtId/secretaria/crear', component: FormSecretaryComponent},
    { path: 'secretaria/editar/:secretaryId', component: FormSecretaryComponent},
    { path: 'login', component:LoginComponent}
];
