import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { GenericModalComponent } from '../components/generic-modal/generic-modal.component';
import { TimePickerComponent } from '../components/time-picker/time-picker.component';
import { DietaComponent } from "../components/dieta/dieta.component";
import { NgApexchartsModule } from 'ng-apexcharts';
import { DailyChartComponent } from "../components/daily-chart/daily-chart.component";
import { PerfilComponent } from "../components/perfil/perfil.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    GenericModalComponent,
    TimePickerComponent,
    DietaComponent,
    NgApexchartsModule,
    DailyChartComponent,
    PerfilComponent
],
  declarations: [HomePage]
})
export class HomePageModule {}
