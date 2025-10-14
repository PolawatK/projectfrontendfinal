import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Employee } from './employee/employee';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'Dashboard',
        pathMatch:'full'
    },
    {
        path:'Dashboard',
        component:Dashboard
    },
    {
        path:'Employee',
        component:Employee
    }
];
