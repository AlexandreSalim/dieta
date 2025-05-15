import { Component, OnInit } from '@angular/core';
import { IonHeader, IonButton, IonLabel, IonContent, IonImg, IonButtons } from "@ionic/angular/standalone";
import { UserStateService } from '../service/user-state.service';
import { Router } from '@angular/router';
import { ProgressH1Component } from '../components/progress-h1/progress-h1.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sugestao',
  templateUrl: './sugestao.page.html',
  styleUrls: ['./sugestao.page.scss'],
  standalone: true,
  imports: [IonButtons, IonImg, IonContent, IonLabel, IonButton, IonHeader, ProgressH1Component, NgIf ]
})
export class SugestaoPage implements OnInit {

  suggestion: 'Lose Weight' | 'Maintain Weight' | 'Gain Muscle' = 'Maintain Weight';
  suggestionLayout = '';
  public progress = 0.80;

  constructor(private userStateService: UserStateService, private router: Router) { }

  ngOnInit() {
    const userstate = this.userStateService.getCurrentData()
    const imc = Number(userstate.weight) / Math.pow(Number(userstate.height) / 100, 2);
    
    if (imc < 18.5) {
      this.suggestion = 'Gain Muscle'
      this.suggestionLayout = 'Ganhar peso'
    } 
    else if (imc < 24.9) {
      this.suggestion = 'Maintain Weight'
      this.suggestionLayout = 'Manter peso'
    }
    else {
      this.suggestion = 'Lose Weight'
      this.suggestionLayout = 'Perder peso'
    }
  }
     /** Aplica sugestão baseada no IMC */
     applySuggestion() {
      this.userStateService.setPartialData({
        goal: this.suggestion
      });
      this.router.navigate(['/imc']);
    }
  
    /** Usuário escolhe customizar seu objetivo */
    applyCustom() {
      this.router.navigate(['/objetivo']);
    }

}
