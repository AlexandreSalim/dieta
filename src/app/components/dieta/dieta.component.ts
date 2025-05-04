import { Component } from '@angular/core';
import { Refeicao, WorkoutService } from '../../service/workout.service';
import { IonLabel, IonChip, IonCardContent, IonCard } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';


import { AuthenticationService } from 'src/app/service/authentication.service';
import { Dieta } from 'src/app/interfaces/dieta.interface';


@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.component.html',
  styleUrls: ['./dieta.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, IonChip,  
    IonLabel,
    CommonModule
  ],
})
export class DietaComponent {

  public grupoDieta: Dieta[] = []
  
  constructor(
    private authenticationService: AuthenticationService
  ) {

    this.authenticationService.getDieta().subscribe({
      next: (dieta: Dieta[]) => {
        // atribui todo o array retornado
        this.grupoDieta = dieta;
        console.log('Dieta recebida:', this.grupoDieta);
      },
      error: err => {console.log(err)}
    })
   

  }
}