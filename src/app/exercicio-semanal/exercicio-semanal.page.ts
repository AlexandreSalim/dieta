import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonButton, IonProgressBar } from '@ionic/angular/standalone';
import { UserStateService } from '../service/user-state.service';
import { chevronBackOutline, barbellOutline, constructOutline, newspaperOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { ProgressH1Component } from '../components/progress-h1/progress-h1.component';

register();

@Component({
  selector: 'app-exercicio-semanal',
  templateUrl: './exercicio-semanal.page.html',
  styleUrls: ['./exercicio-semanal.page.scss'],
  standalone: true,
  imports: [IonProgressBar, IonButton, IonIcon, IonContent, CommonModule, FormsModule, ProgressH1Component],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExercicioSemanalPage implements OnInit, AfterViewInit {

  public buffer = 0.06;
  public progress = 0.30;
  daysOfWeek = ['../../assets/img/espaco-de-trabalho.gif', '../../assets/img/andar.gif', '../../assets/img/correr.gif', '../../assets/img/correndo.gif'];
  exercises = ['Praticamente parado', 'Se mexe de vez em quando', 'Se movimenta com frequência', 'Sempre em movimento!'];
  explainingExercises =[
    'Você quase não faz nenhum tipo de atividade física',
    'De vez em quando você se movimenta mas ainda está longe do ideal',
    'Você pratica atividades físicas em boa parte da semana!',
    'você é super ativo(a) e se exercita quase todos os dias!'
  ]

  exercisesChosen: any;
  @ViewChild('mySwiper') swiper?: any;
  
  constructor(private userState: UserStateService, private router: Router) {
    addIcons({chevronBackOutline,newspaperOutline,barbellOutline,constructOutline});
  }

  ngAfterViewInit() {
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
    // console.log('Slide ativo:', activeIndex);
  
    if (activeIndex >= 0 && activeIndex < this.exercises.length) {
      this.exercisesChosen = {
        icon: this.daysOfWeek[activeIndex],
        exercise: this.exercises[activeIndex],
        explanation: this.explainingExercises[activeIndex]
      };
      // console.log('Dados completos:', this.exercisesChosen);
    }
  }
  

  objetivo() {
    if (this.exercisesChosen) {
      this.userState.setPartialData({
        exerciseFrequency: this.exercisesChosen.exercise
      });
     this.router.navigate(['/objetivo'])
    }
  }

}
