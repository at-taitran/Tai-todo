import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {GuardGuard} from '../app/auth/guard.guard';


const routes: Routes = [ 
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },

  // // otherwise redirect to home
  // { path: '**', redirectTo: 'homenpm install --save-dev webpack' }
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'features',
    loadChildren:() => import('./features/features.module').then(m => m.FeaturesModule),
    canActivate:[GuardGuard]
  },
  {
    path:'**',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
