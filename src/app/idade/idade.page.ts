import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonInput, IonButton, IonLabel, IonIcon, IonProgressBar, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { UserStateService } from '../service/user-state.service';
import { Router } from '@angular/router';
import { ProgressH1Component } from '../components/progress-h1/progress-h1.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-idade',
  templateUrl: './idade.page.html',
  styleUrls: ['./idade.page.scss'],
  standalone: true,
  imports: [NgxMaskDirective, IonImg, ProgressH1Component, IonLabel, IonButton, IonContent, CommonModule, FormsModule, IonInput],
  providers: [provideNgxMask(),]
})
export class IdadePage {

  @ViewChild('idadeTemplate', { static: false }) idadeTemplate!: ElementRef<HTMLInputElement>;

  public progress = 0.30;
  idade: string = '';

  constructor(private userState: UserStateService, private router: Router) {
    addIcons({});
  }

  ngAfterViewInit() {
    setTimeout(() => this.idadeTemplate.nativeElement.focus(), 300); // Pequeno delay para garantir renderização
  }

  nivelTreino() {
    if(this.idade) {
      const age = this.idade;
      this.userState.setPartialData({age});
      this.router.navigate(['/peso-altura'])
    }
  }

  proximo() {
    if(Number(this.idade) >= 10) {
      this.nivelTreino();
    }
  }

}
