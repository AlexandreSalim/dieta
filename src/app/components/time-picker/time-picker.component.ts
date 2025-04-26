import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule }  from '@ionic/angular';
import { GenericModalComponent } from "../generic-modal/generic-modal.component";

@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [CommonModule, IonicModule, GenericModalComponent],
  templateUrl: 'time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements AfterViewInit {
  dia: boolean = false;
  hora: boolean = true;
  modal = false;
  private chosenTime = '';

  daysList      = ['D','S','T','Q','Q','S','S'];
  firstRowDays  = this.daysList.map((d,i) => ({ label: d, idx: i })).slice(0,4);
  secondRowDays = this.daysList.map((d,i) => ({ label: d, idx: i })).slice(4);
  selectedDayIndices: number[] = [];

  hoursList   = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, '0')
  );
  minutesList = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, '0')
  );

  selectedHourIndex = 0;
  selectedMinuteIndex = 0;

  @ViewChild('hourPicker', { static: true })
  hourPicker!: ElementRef<HTMLDivElement>;
  @ViewChild('minPicker',  { static: true })
  minPicker!: ElementRef<HTMLDivElement>;

  @Output() timeConfirmed = new EventEmitter<{ time: string; days: number[] }>();

  private readonly itemHeight = 40; // deve bater com o CSS
  private hasScrolled = false;

  ngAfterViewInit() {
    console.log(this.selectedHourIndex)
    // centraliza hora e minuto atuais
    setTimeout(() => {
      this.hourPicker.nativeElement.scrollTop = this.selectedHourIndex * this.itemHeight;
      this.minPicker.nativeElement.scrollTop  = this.selectedMinuteIndex * this.itemHeight;
    });
  }

  onHourScroll() {
    const st  = this.hourPicker.nativeElement.scrollTop;
    const idx = Math.round(st / this.itemHeight);
    if (idx >= 0 && idx < this.hoursList.length) {
      this.selectedHourIndex = idx;
    }
  }

  onMinuteScroll() {
    const st  = this.minPicker.nativeElement.scrollTop;
    const idx = Math.round(st / this.itemHeight);
    if (idx >= 0 && idx < this.minutesList.length) {
      this.selectedMinuteIndex = idx;
    }
  }

toggleDay(idx: number) {
    const pos = this.selectedDayIndices.indexOf(idx);
    if (pos > -1) {
      this.selectedDayIndices.splice(pos, 1);
    } else {
      this.selectedDayIndices.push(idx);
    }
  }

  proximo() {
    this.dia = true;
    this.hora = false;
  }

  confirmTime() {
    this.chosenTime = `${this.hoursList[this.selectedHourIndex]}:`
                    + `${this.minutesList[this.selectedMinuteIndex]}`;
    this.modal = true;
  }

 confirm() {
    const time = `${this.hoursList[this.selectedHourIndex]}:`
               + `${this.minutesList[this.selectedMinuteIndex]}`;
    this.timeConfirmed.emit({ time, days: this.selectedDayIndices });
    this.modal = false;
  }

}
