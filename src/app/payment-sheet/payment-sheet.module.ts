import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentSheetPageRoutingModule } from './payment-sheet-routing.module';

import { PaymentSheetPage } from './payment-sheet.page';
import { GenericModalComponent } from "../components/generic-modal/generic-modal.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentSheetPageRoutingModule,
    GenericModalComponent
],
  declarations: [PaymentSheetPage]
})
export class PaymentSheetPageModule {}
