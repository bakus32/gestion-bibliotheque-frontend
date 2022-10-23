import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIsLoggedGuard } from './helpers/user-is-logged.guard';
import { AuthComponent } from './layout/auth-container/auth.component';
import { LayoutComponent } from './layout/admin-container/admin-container.component';

const routes: Routes = [
  { path: "", redirectTo: "authentification", pathMatch: "full" },
  {
    path: "authentification",
    component: AuthComponent,
    loadChildren: () =>
      import("./layout/auth-container/auth.module").then(
        (m) => m.AuthModule
      ),
  },
 
  {
    path: "administration",
    component: LayoutComponent,
    loadChildren: () =>
      import("./layout/admin-container/admin-container.module").then(
        (m) => m.LayoutModule
      ),
    canActivate: [UserIsLoggedGuard]
  },
  {path: '**', redirectTo: 'authentification'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
