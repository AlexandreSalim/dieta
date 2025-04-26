import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonProgressBar, IonButton, IonInput, IonLabel } from '@ionic/angular/standalone';
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
  imports: [NgxMaskDirective, IonLabel, IonButton, ProgressH1Component, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule, GenericModalComponent],
  providers: [provideNgxMask(),]
})
export class PesoAlturaPage implements AfterViewInit {

  @ViewChild('pesoInput', { static: false }) pesoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('alturaInput', { static: false }) alturaInput!: ElementRef<HTMLInputElement>;

  public progress = 0.20;
  altura: string = '175';
  peso: string = '60';
  showModal = false;
  suggestion: 'perder' | 'manter' | 'ganhar' = 'ganhar';

  constructor(private userState: UserStateService, private router: Router) {
    addIcons({chevronBackOutline,barbellOutline,constructOutline});
  }

  ngAfterViewInit() {
    setTimeout(() => this.pesoInput.nativeElement.focus(), 300)
  }

  focusAltura() {
    this.alturaInput.nativeElement.focus();
  }  
  
  exercicio(type: string) {
      const weight = this.peso;
      const height = this.altura
      this.userState.setPartialData({weight, height, goal: type});
      this.showModal = false;

      if(type === 'type') {
        this.router.navigate(['/objetivo'])
        console.log(this.userState.getCurrentData())
      } else {
        this.router.navigate(['/imc'])
        console.log(this.userState.getCurrentData())
      }
  }

  proximo() {
    if(Number(this.peso) >= 30 && Number(this.altura) >= 100) {
      const imc = Number(this.peso) / Math.pow(Number(this.altura) / 100, 2);

      if (imc < 18.5) this.suggestion = 'ganhar' 
      else if (imc < 24.9) this.suggestion = 'manter'
      else this.suggestion = 'perder'
      
      this.showModal = true;
    }
  }

   /** Aplica sugestão baseada no IMC */
   applySuggestion() {
    this.userState.setPartialData({
      weight: this.peso,
      height: this.altura,
      goal: this.suggestion
    });
    this.showModal = false;
    this.router.navigate(['/imc']);
  }

  /** Usuário escolhe customizar seu objetivo */
  applyCustom() {
    this.showModal = false;
    this.router.navigate(['/objetivo']);
  }

}
