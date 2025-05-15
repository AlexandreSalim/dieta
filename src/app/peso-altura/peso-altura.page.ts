import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonProgressBar, IonButton, IonInput, IonLabel, IonImg } from '@ionic/angular/standalone';
import { UserStateService } from '../service/user-state.service';
import { chevronBackOutline, barbellOutline, constructOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { ProgressH1Component } from '../components/progress-h1/progress-h1.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { GenericModalComponent } from '../components/generic-modal/generic-modal.component';

@Component({
  selector: 'app-peso-altura',
  templateUrl: './peso-altura.page.html',
  styleUrls: ['./peso-altura.page.scss'],
  standalone: true,
  imports: [IonImg, NgxMaskDirective, IonLabel, IonButton, ProgressH1Component, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule, GenericModalComponent],
  providers: [provideNgxMask(),]
})
export class PesoAlturaPage implements AfterViewInit {

  @ViewChild('pesoInput', { static: false }) pesoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('alturaInput', { static: false }) alturaInput!: ElementRef<HTMLInputElement>;

  public progress = 0.60;
  altura: string = '';
  peso: string = '';

  constructor(private userState: UserStateService, private router: Router) {
    addIcons({chevronBackOutline,barbellOutline,constructOutline});
  }

  ngAfterViewInit() {
    setTimeout(() => this.pesoInput.nativeElement.focus(), 300)
  }

  focusAltura() {
    this.alturaInput.nativeElement.focus();
  }  
  
  exercicio() {
      const weight = this.peso;
      const height = this.altura
      this.userState.setPartialData({weight, height});
  }

  proximo() {
    if(Number(this.peso) >= 30 && Number(this.altura) >= 100) {
      this.exercicio()
      this.router.navigate(['/sugestao']);
    }
  }



}
