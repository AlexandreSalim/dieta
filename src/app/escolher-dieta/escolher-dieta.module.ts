import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscolherDietaPageRoutingModule } from './escolher-dieta-routing.module';

import { EscolherDietaPage } from './escolher-dieta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscolherDietaPageRoutingModule
  ],
})
export class EscolherDietaPageModule {}
