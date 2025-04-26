import { Component, ElementRef, ViewChild } from '@angular/core';
import { GenericModalComponent } from '../components/generic-modal/generic-modal.component';

interface DrinkEntry {
  ml: number;
  time: Date;
}

interface Reminder {
  time: string;
  days: number[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  buffer = 0.06;
  progress = 0;
  metaMl = 2250;
  goalBeat = 0;

  showModal = false;
  showModalTime = false;
  dieta = false;
  home = true;
  daily = false;
  perfil = false;

  // array de lembretes: cada um com hora e dias
  reminders: Reminder[] = [];

  // arrays auxiliares para renderizar dias abreviados
  allDays = ['dom','seg','ter','qua','qui','sex','sab'];
  daysSelected: Number[] = [];

  mlDays = ['50', '100', '200', '500', '1000'];
  mlDaysChecked: DrinkEntry[] = [];

  @ViewChild('metaBatida') metaBatida!: ElementRef<HTMLDivElement>;

  mlDaysCheck(mlText: string) {
    const mlNum = parseInt(mlText, 10);
    this.mlDaysChecked.push({ ml: mlNum, time: new Date() });
    const total = this.getTotalMl();
    this.progress = total / this.metaMl;
    if (this.progress > 1) this.progress = 1;
    this.goalBeat = total * this.progress;
    if (this.goalBeat >= this.metaMl) {
      this.metaBatida.nativeElement.style.display = 'block';
      setTimeout(() => this.metaBatida.nativeElement.style.display = 'none', 5000);
    }
  }

  getTotalMl(): number {
    return this.mlDaysChecked.reduce((sum, entry) => sum + entry.ml, 0);
  }

  close(index: number) {
    this.mlDaysChecked.splice(index, 1);
    const total = this.getTotalMl();
    this.progress = total / this.metaMl;
    if (this.progress > 1) this.progress = 1;
  }

  abrirModal() {
    this.showModal = true;
  }

  fecharModal() {
    this.showModal = false;
  }

  abrirLembreteModal() {
    this.showModalTime = true;
  }

  fecharLembreteModal() {
    this.showModalTime = false;
  }

  // callback do time-picker: adiciona um novo reminder
  onTimeConfirmed(timeDay: { time: string; days: number[] }) {
    this.daysSelected = [...timeDay.days];
    this.reminders.push({
      time: timeDay.time,
      days: [...timeDay.days]
    });
    console.log(this.daysSelected)
    this.fecharLembreteModal();
  }

  // remove reminder pelo índice
  removeReminder(idx: number) {
    this.reminders.splice(idx, 1);
  }

  callDiet() {
    this.dieta = true;
    this.home = false;
    this.daily = false;
    this.perfil = false;
  }

  callHome() {
    this.dieta = false;
    this.home = true;
    this.daily = false;
    this.perfil = false;

  }

  callDaily() {
    this.dieta = false;
    this.home = false;
    this.daily = true;
    this.perfil = false;
  }

  callPerfil() {
    this.dieta = false;
    this.home = false;
    this.daily = false;
    this.perfil = true;
  }
}