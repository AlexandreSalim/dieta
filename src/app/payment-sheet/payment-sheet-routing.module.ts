import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentSheetPage } from './payment-sheet.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentSheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentSheetPageRoutingModule {}
