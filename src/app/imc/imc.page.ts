import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
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
import { ViewWillEnter } from '@ionic/angular';


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
    InfoPopoverComponent,
  ]
})
export class ImcPage implements OnInit, ViewWillEnter {

  public buffer = 0.06;
  public progress = 0.80;

  peso: string | undefined;
  altura: string | undefined;
  imc = '';
  situacao = '';
  pesoIdealMin!: number;
  pesoIdealMax!: number;
  mensagemSituacao = '';
  text = '';
  titleText = '';
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

 ionViewWillEnter(): void {
    const relatorio = this.userStateService.getCurrentData();
    this.altura = relatorio.height;
    this.peso   = relatorio.weight;
    this.calculo();
  }

  calculo() {
    const alturaM = Number(this.altura) / 100;
    const imc = Number(this.peso) / Math.pow(Number(this.altura) / 100, 2);
    this.imc = imc.toFixed(1);

  if (imc < 18.5) {
    this.situacao = 'Magreza';
    this.mensagemSituacao = 'Você está abaixo do peso ideal';
    this.text = 'Atenção: Seu IMC indica baixo peso. Recomendamos buscar orientação de um nutricionista para uma dieta balanceada e prática segura de exercícios físicos para ganho de massa muscular de forma saudável.';
    this.span1.nativeElement.style.padding = '8px';
  } else if (imc < 24.9) {
    this.situacao = 'Normal';
    this.mensagemSituacao = 'Você está no peso ideal';
    this.text = 'Parabéns! Seu peso está dentro da faixa considerada saudável. Mantenha hábitos alimentares balanceados e pratique atividades físicas regularmente para preservar sua saúde e qualidade de vida.';
    this.span2.nativeElement.style.padding = '8px';
  } else if (imc < 29.9) {
    this.situacao = 'Sobrepeso';
    this.mensagemSituacao = 'Você está acima do peso ideal';
    this.text = 'Cuidado: Seu IMC indica sobrepeso. Considere ajustar seus hábitos alimentares e aumentar a atividade física. Pequenas mudanças como reduzir porções e caminhar diariamente podem fazer grande diferença.';
    this.span3.nativeElement.style.padding = '8px';
  } else if (imc < 34.9) {
    this.situacao = 'Obesidade grau I';
    this.mensagemSituacao = 'Atenção: Risco elevado';
    this.text = 'Seu IMC indica Obesidade Grau I. Recomendamos consultar um médico para avaliação e orientações personalizadas. A perda de peso controlada pode reduzir riscos de doenças cardiovasculares e diabetes.';
    this.span4.nativeElement.style.padding = '8px';
  } else if (imc < 39.9) {
    this.situacao = 'Obesidade grau II';
    this.mensagemSituacao = 'Risco muito elevado';
    this.text = 'Seu IMC indica Obesidade Grau II. É importante buscar acompanhamento médico especializado. Programas estruturados de perda de peso com profissionais de saúde podem ajudar a melhorar sua qualidade de vida.';
    this.span4.nativeElement.style.padding = '8px';
  } else {
    this.situacao = 'Obesidade grau III';
    this.mensagemSituacao = 'Risco crítico de saúde';
    this.text = 'Seu IMC indica Obesidade Grau III (obesidade mórbida). Recomendamos urgentemente procurar atendimento médico para avaliação de riscos e opções de tratamento. Existem diversas estratégias terapêuticas que podem ajudar.';
    this.span4.nativeElement.style.padding = '8px';
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

  payment() {
    const data = this.userStateService.getCurrentData();

    const userPayload: CreateUserHealth = {
      age: Number(data.age),
      gender: data.gender!,
      height_cm: Number(data.height),
      weight_kg: Number(data.weight),
      goal: data.goal!,
    };
    console.log(userPayload);

    this.authenticationService.createUserHealth(userPayload).subscribe({
      next: () => {
        console.log('✔️ tudo enviado com sucesso, indo para payment');
        // this.userStateService.clearData();
        this.userStateService.setHasPaid(false);
        this.userStateService.setHasSelectedDiet(false);
        this.router.navigate(['/payment-sheet'])
      },

      error: err => {
        console.error('🚫 erro final:', err);
        this.error = err?.error?.message || 'falha ao se cadastrar'
      }
    })

  }

}
