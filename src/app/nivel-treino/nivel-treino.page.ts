import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonButton, IonProgressBar, IonImg } from '@ionic/angular/standalone';
import { UserStateService } from '../service/user-state.service';
import { chevronBackOutline, barbellOutline, constructOutline, newspaperOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { ProgressH1Component } from '../components/progress-h1/progress-h1.component';

register();

@Component({
  selector: 'app-nivel-treino',
  templateUrl: './nivel-treino.page.html',
  styleUrls: ['./nivel-treino.page.scss'],
  standalone: true,
  imports: [IonProgressBar, IonButton, ProgressH1Component, IonContent, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NivelTreinoPage implements OnInit, AfterViewInit {

  public buffer = 0.06;
  public progress = 0.60;
  progress_treino = 0.02;
  daysOfWeek = [
    '../../assets/img/fogo_nivel_iniciante_Ativo_1.svg',
    '../../assets/img/fogo_nivel_intermediárioAtivo_2.svg',
    '../../assets/img/fogo_nivel_avançado_Ativo_3.svg'
  ];
  exercises = ['Maintain Weight', 'Improve Fitness', 'Gain Muscle'];
  explainingExercises = [
    'Comece com o pé direito. Treinos leves para ganhar ritmo e movimentação!',
    'Desafios na medida certa. Evolua com consistência!',
    'Alta performace. Treinos intensos para resultados reais!'
  ];

  exercisesChosen: any;
  @ViewChild('mySwiper') swiper?: any;
  @ViewChild('start') dotStart!: ElementRef;
  @ViewChild('middle') dotMiddle!: ElementRef;
  @ViewChild('end') dotEnd!: ElementRef;
  
  // Definindo constantes de cores
  private readonly COR_INICIANTE = '#FFC00C';
  private readonly COR_INTERMEDIARIO = '#FF7F28';
  private readonly COR_AVANCADO = '#E50304';
  private readonly COR_CINZA = 'rgb(164, 164, 164)';

  constructor(
    private userState: UserStateService,
    private router: Router,
    private renderer: Renderer2
  ) {
    addIcons({ chevronBackOutline, newspaperOutline, barbellOutline, constructOutline });
  }

  ngAfterViewInit() {
    // Atualiza o swiper
    setTimeout(() => {
      if (this.swiper?.nativeElement?.swiper) {
        this.swiper.nativeElement.swiper.update();
      }
    }, 500);
  }

  ngOnInit() {
    this.exercisesChosen = {
      icon: this.daysOfWeek[0],
      exercise: this.exercises[0],
      explanation: this.explainingExercises[0]
    };
  }

  onSlideChange(event: any) {
    const swiper = event.detail[0];
    if (!swiper) return;
  
    const activeIndex = swiper.activeIndex;
  
    if (activeIndex >= 0 && activeIndex < this.exercises.length) {
      this.exercisesChosen = {
        icon: this.daysOfWeek[activeIndex],
        exercise: this.exercises[activeIndex],
        explanation: this.explainingExercises[activeIndex]
      };

      if (this.exercisesChosen.exercise === 'Maintain Weight') {
        this.progress_treino = 0.02; // ou 0.0 para 0%
        this.renderer.setStyle(this.dotStart.nativeElement, 'backgroundColor', this.COR_INICIANTE);
        this.renderer.setStyle(this.dotMiddle.nativeElement, 'backgroundColor', this.COR_CINZA);
        this.renderer.setStyle(this.dotEnd.nativeElement, 'backgroundColor', this.COR_CINZA);
      }

      if (this.exercisesChosen.exercise === 'Improve Fitness') {
        this.progress_treino = 0.50;
        this.renderer.setStyle(this.dotStart.nativeElement, 'backgroundColor', this.COR_INICIANTE);
        this.renderer.setStyle(this.dotMiddle.nativeElement, 'backgroundColor', this.COR_INTERMEDIARIO);
        this.renderer.setStyle(this.dotEnd.nativeElement, 'backgroundColor', this.COR_CINZA);
      }

      if (this.exercisesChosen.exercise === 'Gain Muscle') {
        this.progress_treino = 1.0;
        this.renderer.setStyle(this.dotStart.nativeElement, 'backgroundColor', this.COR_INICIANTE);
        this.renderer.setStyle(this.dotMiddle.nativeElement, 'backgroundColor', this.COR_INTERMEDIARIO);
        this.renderer.setStyle(this.dotEnd.nativeElement, 'backgroundColor', this.COR_AVANCADO);
      }
    }
  }

  goToSlide(slideIndex: number): void {
    // Verifica se o swiper foi inicializado e está acessível
    if (this.swiper && this.swiper.nativeElement && this.swiper.nativeElement.swiper) {
      // slideTo recebe o índice do slide que você deseja ir
      this.swiper.nativeElement.swiper.slideTo(slideIndex);
    } else {
      console.error('Swiper instance is not available.');
    }
  }
  
  objetivo() {
    if (this.exercisesChosen) {
      const training_level = this.exercisesChosen.exercise;
      this.userState.setPartialData({training_level});
      // Navegue ou execute outra ação se necessário
      console.log(this.userState.getCurrentData())   
      this.router.navigate(['./imc']) 
    }
  }
}
