import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component'; 
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'usuarios',           component: UserComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'expedientes',     component: TypographyComponent },
    { path: 'destinos',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    { path: 'juzgados',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
