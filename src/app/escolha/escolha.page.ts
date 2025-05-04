import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonProgressBar, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { UserStateService } from '../service/user-state.service';
import { Router } from '@angular/router';
import { ProgressH1Component } from "../components/progress-h1/progress-h1.component";

@Component({
  selector: 'app-escolha',
  templateUrl: './escolha.page.html',
  styleUrls: ['./escolha.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonProgressBar, IonContent, CommonModule, FormsModule, ProgressH1Component]
})
export class EscolhaPage implements OnInit {

  public progress = 0.20;
  selectedGender: 'female' | 'male' | null = null;

  constructor(private userState: UserStateService, private router: Router) {
    addIcons({ chevronBackOutline });
  }

  selectGender(gender: 'female' | 'male') {
    this.selectedGender = gender;
    this.userState.setPartialData({ gender });
  }

  pesoAltura() {
    this.router.navigate(['/idade'])
  }

  ngOnInit(): void {}
}
