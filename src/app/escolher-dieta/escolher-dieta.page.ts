import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonButton, IonCheckbox } from "@ionic/angular/standalone";
import { CategoriaIMC, ModeloAlimentar, NivelTreino, Refeicao, WorkoutService } from '../service/workout.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStateService } from '../service/user-state.service';
import Swiper from 'swiper';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../service/authentication.service';
import { SwiperOptions } from 'swiper/types';

interface Dieta {
  modelo: string;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  cardapio: Refeicao[][];
  nivelTreino: string;
}

type Objetivo = 'perder' | 'manter' | 'ganhar';

export interface GeneratedDietItem {
  id: number;
  meal_times_nutrition_id: number;
  diet_id: number;
  meal_nutrition_id: number;
  meal_time_id: number;
  meal_name: string;
  meal_nutrition: string;
  meal_time: string;       // ex: "07:30:00"
  calorie_content: string;
  carbohydrate_content: string;
  fat_content: string;
  protein_content: string;
}

export interface DietOption {
  id: number;              // ID da opção de dieta
  diet_id: number;         // ID geral da dieta
  bmi: string;
  weight_kg: string;
  height_cm: string;
  goal: string;
  itens: GeneratedDietItem[];  // refeições detalhadas
  total_calorie_content: string;
  total_carbohydrate_content: string;
  total_fat_content: string;
  total_protein_content: string;
  user_id: number;
}

@Component({
  selector: 'app-escolher-dieta',
  templateUrl: './escolher-dieta.page.html',
  styleUrls: ['./escolher-dieta.page.scss'],
  imports:[IonicModule, CommonModule],
})
export class EscolherDietaPage implements OnInit {

  dietOptions: DietOption[] = [];
  currentIndex = 0;
  private swiper!: Swiper;

  swiperConfig: SwiperOptions = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: { rotate: 0, stretch: -60, depth: 0, modifier: 2, slideShadows: false, scale: 0.85 },
    on: {
      slideChange: () => { this.currentIndex = this.swiper.realIndex; }
    }
  };

  constructor(
    private authService: AuthenticationService,
    private userStateService: UserStateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDietOptions();
  }

  ngAfterViewInit() {
    // swiper inicializado após os slides serem renderizados
  }

  private loadDietOptions() {
    this.authService.getGenerateDieta().subscribe({
      next: options => {
        this.dietOptions = options;
        setTimeout(() => this.initSwiper(), 0);
      },
      error: err => console.error('Erro ao carregar dietas:', err)
    });
  }

  private initSwiper() {
    this.swiper = new Swiper('.swiper-container', this.swiperConfig);
  }

  selectOption() {
    const selected = this.dietOptions[this.currentIndex];
    this.userStateService.setPartialData({ dieta: selected.id });
    this.authService.setDieta(selected.id).subscribe({
      next: () => this.router.navigate(['/home']),
      error: err => console.error('Erro ao salvar dieta:', err)
    });
  }
}