import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { ListDestinataryComponent } from '../../destinatary/list-destinatary/list-destinatary.component';
import { TypographyComponent } from '../../typography/typography.component';
import { DestinataryComponent } from '../../destinatary/destinatary.component';
import { CourtComponent } from '../../court/court.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'usuarios',           component: UserComponent },
    { path: 'list-destinatary', component: ListDestinataryComponent },
    { path: 'expedientes',     component: TypographyComponent },
    { path: 'destinos',          component: DestinataryComponent },
    { path: 'juzgados',  component: CourtComponent },    
];
