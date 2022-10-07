import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MaterialModule } from '../../components/shared/material/material.module';
import { DialogDetailComponent } from './dialog-detail/dialog-detail.component';
import { IndexComponent } from './index/index.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';


@NgModule({
  declarations: [
    DialogDetailComponent,
    IndexComponent,
    MoviesListComponent,
    NavigationMenuComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialModule
  ]
})
export class MoviesModule { }
