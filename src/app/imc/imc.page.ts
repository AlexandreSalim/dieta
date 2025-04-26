import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonButton, IonSpinner } from '@ionic/angular/standalone';
import { chevronBackOutline, informationCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { UserStateService } from '../service/user-state.service';
import { ProgressH1Component } from '../components/progress-h1/progress-h1.component';
import { InfoPopoverComponent } from '../components/info-popover/info-popover.component';
import { PopoverController } from '@ionic/angular';
import { CreateUserHealth, CreateUserRequest } from '../interfaces/createUser.interface';
import { AuthenticationService } from '../service/authentication.service';
import { switchMap, tap } from 'rxjs';
import { LoginRequest } from '../interfaces/login.interface';

@Component({
  selector: 'app-imc',
  templateUrl: './imc.page.html',
  styleUrls: ['./imc.page.scss'],
  standalone: true,
  imports: [IonSpinner, 
    IonButton, 
    IonIcon, 
    IonContent, 
    CommonModule, 
    FormsModule, 
    ProgressH1Component,
    InfoPopoverComponent
  ]
})
export class ImcPage implements OnInit {

  public buffer = 0.06;
  public progress = 0.30;

  peso: string | undefined;
  altura: string | undefined;
  imc = '';
  situacao = '';
  pesoIdealMin!: number;
  pesoIdealMax!: number;
  mensagemSituacao = '';
  text = '';
  titleText = '';
  isLoading = false;
  error = '';

  @ViewChild('span1') span1!: ElementRef<HTMLSpanElement>;
  @ViewChild('span2') span2!: ElementRef<HTMLSpanElement>;
  @ViewChild('span3') span3!: ElementRef<HTMLSpanElement>;
  @ViewChild('span4') span4!: ElementRef<HTMLSpanElement>;

  constructor(
    private router: Router, 
    private userStateService: UserStateService, 
    private authenticationService: AuthenticationService,
    private popoverCtrl: PopoverController
  ) { 
        addIcons({informationCircleOutline,chevronBackOutline});
  }

  ngOnInit() {
    const relatorio = this.userStateService.getCurrentData();
    this.altura = relatorio.height
    this.peso = relatorio.weight    
    setTimeout(() => this.calculo(), 300 )
  }

  calculo() {
    const alturaM = Number(this.altura) / 100;
    const imc = Number(this.peso) / Math.pow(Number(this.altura) / 100, 2);
    this.imc = imc.toFixed(1);

    if (imc < 18.5) {
      this.situacao = 'Magreza';
      this.mensagemSituacao = 'Você está abaixo do peso ideal';
      this.text = '1 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam quas placeat fugit harum recusandae';
      this.span1.nativeElement.style.padding = '8px'
    } else if (imc < 24.9) {
      this.situacao = 'Normal';
      this.mensagemSituacao = 'Você está no peso ideal';
      this.text = '2 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam quas placeat fugit harum recusandae';
      this.span2.nativeElement.style.padding = '8px'
    } else if (imc < 29.9) {
      this.situacao = 'Sobrepeso';
      this.mensagemSituacao = 'Você está acima do peso ideal';
      this.text = '3 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam quas placeat fugit harum recusandae';
      this.span3.nativeElement.style.padding = '8px'
    } else if (imc < 34.9) {
      this.situacao = 'Obesidade grau I';
      this.mensagemSituacao = 'Você está acima do peso ideal';
      this.text = '4 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam quas placeat fugit harum recusandae';
      this.span4.nativeElement.style.padding = '8px'
    } else if (imc < 39.9) {
      this.situacao = 'Obesidade grau II';
      this.mensagemSituacao = 'Você está acima do peso ideal';
      this.text = '5 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam quas placeat fugit harum recusandae';
      this.span4.nativeElement.style.padding = '8px'
    } else {
      this.situacao = 'Obesidade grau III';
      this.mensagemSituacao = 'Você está acima do peso ideal';
      this.text = '6 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam quas placeat fugit harum recusandae';
      this.span4.nativeElement.style.padding = '8px'
    }

    this.pesoIdealMin = Math.round(18.5 * alturaM * alturaM);
    this.pesoIdealMax = Math.round(24.9 * alturaM * alturaM);
  }
  
  async presentPopover(ev: Event) {
    const popover = await this.popoverCtrl.create({
      component: InfoPopoverComponent,
      event: ev,
      translucent: true,
      cssClass: 'custom-popover'  // opcional, para ajustar estilo
    });
    await popover.present();
  }

  home() {
    const data = this.userStateService.getCurrentData();

    const userPayload: CreateUserHealth = {
      user_id: data.age!,
      weight_kg: data.weight!,
      height_cm: data.height!,
      goal: data.goal!,
      age: data.age!,
      gender: data.gender!
    };

    this.isLoading = true;

    this.authenticationService.createUserHealth(userPayload).subscribe({
      next: () => {
        console.log('✔️ tudo enviado com sucesso, indo para home');
        this.userStateService.clearData();
        this.router.navigate(['/home'])
      },

      error: err => {
        console.error('🚫 erro final:', err);
        this.error = err?.error?.message || 'falha ao se cadastrar'
        this.isLoading = false;
      }
    })

  }

}
