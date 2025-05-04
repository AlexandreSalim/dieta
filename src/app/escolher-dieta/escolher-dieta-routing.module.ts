import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscolherDietaPage } from './escolher-dieta.page';

const routes: Routes = [
  {
    path: '',
    component: EscolherDietaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscolherDietaPageRoutingModule {}
