import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FirstComponent } from './components/first/first.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: "home"
  },
  {path: 'home', component: FirstComponent},
  {path: 'character', component: FirstComponent},
  {path: 'movie', component: FirstComponent},
  {path: 'about', component: FirstComponent}

  // {
  //   path: '',       
  //   component: NotFoundComponent,
  //   pathMatch: 'full'
  // },
  // {
  //   path: '**',   
  //   redirectTo: '404',
  // }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
