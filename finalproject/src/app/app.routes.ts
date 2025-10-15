import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    loadChildren: () => import('./login/login.routes').then(m => m.LOGIN_ROUTES)
  },
  {
    path: 'Employee',
    loadChildren: () => import('./employee/employee.routes').then(m => m.EMPLOYEE_ROUTES)
  },
  {
    path: 'Dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  },
  {
    path: 'InsertEmployee',
    loadChildren: () => import('./insertemployee/insertemployee.routes').then(m => m.INSERTEMPLOYEE_ROUTES)
  },
  {
    path: 'Salary',
    loadChildren: () => import('./salary/salary.routes').then(m => m.SALARY_ROUTES)
  }
];
