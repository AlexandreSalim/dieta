import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExercicioSemanalPage } from './exercicio-semanal.page';

const routes: Routes = [
  {
    path: '',
    component: ExercicioSemanalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercicioSemanalPageRoutingModule {}
