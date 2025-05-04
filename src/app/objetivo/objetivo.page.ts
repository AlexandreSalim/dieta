import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonLabel, IonProgressBar, IonImg } from '@ionic/angular/standalone';
import { barbellOutline, chevronBackOutline, constructOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { UserStateService } from '../service/user-state.service';
import { Router } from '@angular/router';
import { ProgressH1Component } from '../components/progress-h1/progress-h1.component';

@Component({
  selector: 'app-objetivo',
  templateUrl: './objetivo.page.html',
  styleUrls: ['./objetivo.page.scss'],
  standalone: true,
  imports: [IonImg, ProgressH1Component, IonLabel, IonButton, IonContent, CommonModule, FormsModule]
})
export class ObjetivoPage {

  public buffer = 0.06;
  public progress = 0.40;
  threeSelection: 'Lose Weight' | 'Maintain Weight' | 'Gain Muscle' | null = 'Maintain Weight';

  constructor(private userState: UserStateService, private router: Router) {
    addIcons({chevronBackOutline,barbellOutline,constructOutline});
  }

 
  selectThree(goal: 'Lose Weight' | 'Maintain Weight' | 'Gain Muscle') {
    this.threeSelection = goal;
    this.userState.setPartialData({ goal });
  }

  idade() {
    this.router.navigate(['/imc'])
  }
}
