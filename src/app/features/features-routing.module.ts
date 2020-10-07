import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features.component';

const routes: Routes = [
  {
    path:'',
    component: FeaturesComponent,
    children: [
      {
        path:'home',
        loadChildren:() => import('./home/home.module').then(m=>m.HomeModule)
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
