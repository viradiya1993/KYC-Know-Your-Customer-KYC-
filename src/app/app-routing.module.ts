import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppConst } from './app.constant';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { NoPermissionComponent } from './pages/no-permission/no-permission.component';
import { ResetLinkComponent } from './pages/reset-link/reset-link.component';
import { ReseOnLoginComponent } from './pages/reset-on-login/reset-on-login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PrivilageGuard } from './privilage.guard';

const { 
  PRIVILAGE_CONSATNT: { 
    VIEW_DASHBOARD,
    VIEW_BULK_VERIFICATION_PAGE, 
    VIEW_TRANSACTIONS_PAGE, 
    VIEW_SERVICES_PAGE, 
    USE_SERVICE_TEST, 
    USE_BULK, 
    USE_SERVICE_LIVE, 
    TOP_UP,
    VIEW_BILLING_PAGE,
    SWITCH_TO_LIVE, 
    CREATE_USERS, 
    UMM, 
    CAG, 
    CEU, 
    UAU,
    RMM,
    URP,
    VIEW_ROLES_PAGE
  }} = AppConst

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingModule), canActivate: [AuthGuard] },
  {
    path: 'users',
    loadChildren: () => import('./pages/user-management/user-management.module').then(mod => mod.UserManagementModule),
    data: { type: [UMM, CREATE_USERS, URP] },
    canActivate: [AuthGuard, PrivilageGuard],
  },
  {
    path: 'role',
    loadChildren: () =>
      import('./pages/role-management/role-management.module').then((mod) => mod.RoleManagementModule),  data: { type: [RMM] },
      canActivate: [AuthGuard, PrivilageGuard], },
  { path: 'onboarding', loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingModule), canActivate: [AuthGuard] },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard, PrivilageGuard], data: {type: [VIEW_DASHBOARD]} },
  { path: 'guest', loadChildren: () => import('./pages/guest-verification/guest-verification.module').then(m => m.GuestVerificationModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-link', component: ResetLinkComponent },
  { path: 'reset-on-login-page', component: ReseOnLoginComponent },
  { path: 'no-permission', component: NoPermissionComponent },
  {
    path: 'services', loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesModule),
    canActivate: [AuthGuard, PrivilageGuard], data: { type: [VIEW_SERVICES_PAGE] }
  },
  { path: 'billing', loadChildren: () => import('./pages/billing/billing.module').then(m => m.BillingModule), canActivate: [AuthGuard, PrivilageGuard], data: { type: [VIEW_BILLING_PAGE] } },
  {
    path: 'transactions', loadChildren: () => import('./pages/transactions/transactions.module').then(m => m.TransactionsModule),
    canActivate: [AuthGuard, PrivilageGuard], data: { type: [VIEW_TRANSACTIONS_PAGE] }
  },
  { path: 'bulk-verification', loadChildren: () => import('./pages/bulk-verification/bulk-verification.module').then(m => m.BulkVerificationModule), canActivate: [AuthGuard, PrivilageGuard], data: { type: [VIEW_BULK_VERIFICATION_PAGE] } },
  { path: '**', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
