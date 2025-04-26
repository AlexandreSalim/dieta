import { AfterViewInit, Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModeloAlimentar, Refeicao, WorkoutService } from '../../service/workout.service';
import {
  IonContent, IonCard, IonList, IonItem, IonGrid, IonRow, IonCol, IonChip,
  IonInput, IonButton, IonCardHeader, IonCardContent, IonSelect,
  IonSelectOption, IonLabel, IonItemDivider, IonCheckbox } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CategoriaIMC, NivelTreino } from '../../service/workout.service';
import { debounceTime } from 'rxjs/operators';

import Swiper from 'swiper';
import { EffectCoverflow, Pagination } from 'swiper/modules';


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

@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.component.html',
  styleUrls: ['./dieta.component.scss'],
  standalone: true,
  imports: [IonCheckbox, 
    IonLabel, IonInput, IonCardContent, IonCardHeader, ReactiveFormsModule, FormsModule,
    CommonModule, IonContent, IonCard, IonList, IonItem, IonChip, IonButton, IonSelect,
    IonSelectOption,
  ],
})
export class DietaComponent implements AfterViewInit {
  dietForm: FormGroup;
  showResults = false;

  imc = 0;
  classificacao = '';
  categoria: CategoriaIMC = 'PP'; caloriasDiarias = 0;
  proteinas = 0;
  carboidratos = 0;
  gorduras = 0;
  calculando = false;
  etapaAtual = 1;
  dieta!: Dieta;

  arrowPosition: string = '7%';
  situacaoIMC = '';
  pesoIdeal = '';
  pesoIdealMin: number = 0;
  pesoIdealMax: number = 0;

  modeloSelecionado: string = '';

  objetivoOpcoes = ['perder', 'manter', 'ganhar'];
  modeloAlimentarOpcoes = ['tradicional', 'lowcarb', 'cetogenico'];
  nivelTreinoOpcoes = ['iniciante', 'intermediario', 'avancado', 'expert', 'elite'];

  treinos: any[] = [];
  cardapioAtual: Refeicao[][] = [];

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService,
    private navCtrl: NavController
  ) {

    this.dietForm = this.fb.group({
      peso: [60, [Validators.required, Validators.min(30)]],
      altura: [175, [Validators.required, Validators.min(100)]],
      objetivo: this.fb.control<Objetivo>('perder'),
      modeloAlimentar: this.fb.control<ModeloAlimentar>('tradicional'),
      nivelTreino: this.fb.control<NivelTreino>('iniciante'),
      proteinaPorKg: [1.5, [Validators.required, Validators.min(1)]]
    });

    this.dietForm.valueChanges
      .pipe(debounceTime(0))  
      .subscribe(() => {
        if (this.dietForm.valid) {
          this.calcularIMC();
          console.log('calcular imc')
        }
      });
  }

  private swiper!: Swiper;

  ngAfterViewInit() {
    this.initSwiper();
  }

  private initSwiper() {
    this.swiper = new Swiper('.swiper-container', {
      modules: [EffectCoverflow],
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      initialSlide: 0,
      coverflowEffect: {
        rotate: 0,
        stretch: -60,
        depth: 0,
        modifier: 2,
        slideShadows: false,
        scale: 0.85
      }
    });
  }

  calcularIMC() {
    if (this.dietForm.valid) {
      const peso = this.dietForm.value.peso;
      const altura = this.dietForm.value.altura;
      this.imc = peso / Math.pow(altura / 100, 2);
      this.classificarIMC();
      this.definirPosicaoESituacao();
      this.calcularPesoIdeal();
    }
  }

  etapa2() {
    this.etapaAtual = 2;
  }


  definirPosicaoESituacao() {
    if (this.imc < 18.5) {
      this.arrowPosition = '10%';  // área azul
      this.pesoIdeal = 'abaixo do peso';
      this.situacaoIMC = 'Não esta saudável'
    } else if (this.imc < 25) {
      this.arrowPosition = '30%';  // área verde
      this.pesoIdeal = 'peso ideal';
      this.situacaoIMC = 'Saudável'
    } else if (this.imc < 30) {
      this.arrowPosition = '60%';  // área amarela
      this.pesoIdeal = 'acima do peso';
      this.situacaoIMC = 'outra coisa Saudável'
    } else {
      this.arrowPosition = '90%';  // área vermelha
      this.pesoIdeal = 'muito acima do peso';
      this.situacaoIMC = 'outra coisa pior ainda Saudável'
    }
  }

  calcularPesoIdeal() {
    const altura = Number(this.dietForm.value.altura);
    const alturaEmM = altura / 100;
    this.pesoIdealMin = 18.5 * Math.pow(alturaEmM, 2);
    this.pesoIdealMax = 24.9 * Math.pow(alturaEmM, 2);
  }


  mostrarDieta() {
    if (this.dietForm.valid) {
      const peso = this.dietForm.value.peso;
      const objetivo = this.dietForm.value.objetivo as Objetivo;
      const modelo = this.dietForm.value.modeloAlimentar as ModeloAlimentar;
      const nivel = this.dietForm.value.nivelTreino as NivelTreino;

      const faixaCalorias: Record<Objetivo, [number, number]> = {
        perder: [20, 25],
        manter: [25.1, 29.9],
        ganhar: [30, 35]
      };

      if (!faixaCalorias[objetivo]) {
        console.error('Objetivo inválido:', objetivo);
        return;
      }

      const [min, max] = faixaCalorias[objetivo];
      const calorias = peso * (min + Math.random() * (max - min));

      const proteinaKg = this.dietForm.value.proteinaPorKg;
      const proteinas = peso * proteinaKg;
      const caloriasProteinas = proteinas * 4;
      const caloriasRestantes = calorias - caloriasProteinas;

      this.dieta = {
        modelo: modelo,
        calorias: calorias,
        proteinas: proteinas,
        carboidratos: (caloriasRestantes * 0.75) / 4,
        gorduras: (caloriasRestantes * 0.25) / 9,
        // Passa também o valor de 'calorias' para o getCardapio
        cardapio: this.workoutService.getCardapio(
          this.categoria as CategoriaIMC,
          objetivo,
          modelo,
        ),
        nivelTreino: nivel
      };

      setTimeout(() => {
        if (this.swiper) {
          this.swiper.destroy();
        }
        this.initSwiper();
      }, 100);

      this.treinos = this.workoutService.getTreinos(nivel);
      this.etapaAtual = 3;
    }
  }



  async calcular() {
    if (this.dietForm.valid) {
      this.calculando = true;
      await new Promise(resolve => setTimeout(resolve, 500));

      const peso = Number(this.dietForm.value.peso);
      const altura = Number(this.dietForm.value.altura);


      this.dietForm.patchValue({ peso, altura });

      this.imc = peso / Math.pow(altura / 100, 2);
      this.classificarIMC();
      this.atualizarDados();
      this.showResults = true;
      this.calculando = false;
      this.showResults = true;
    } else {

      this.dietForm.markAllAsTouched();
      console.log(this.dietForm)
    }
  }

  private classificarIMC() {
    const imc = this.imc;
    const classificacoes = [
      { limite: 17, classe: 'PP', categoria: 'PP' as CategoriaIMC },
      { limite: 18.5, classe: 'P', categoria: 'P' as CategoriaIMC },
      { limite: 25, classe: 'M', categoria: 'M' as CategoriaIMC },
      { limite: 30, classe: 'G', categoria: 'G' as CategoriaIMC },
      { limite: 35, classe: 'GG', categoria: 'GG' as CategoriaIMC },
      { limite: 40, classe: 'XG', categoria: 'XG' as CategoriaIMC },
      { limite: Infinity, classe: 'EXG', categoria: 'EXG' as CategoriaIMC }
    ];

    const classificacaoEncontrada = classificacoes.find(c => this.imc < c.limite) || classificacoes[0];
    this.classificacao = `${classificacaoEncontrada.classe} (IMC: ${imc.toFixed(1)})`;
    this.categoria = classificacaoEncontrada.categoria;
  }

  private atualizarDados() {
    if (this.dietForm.valid) {
      this.calcularCalorias();
      this.calcularMacronutrientes();
      this.carregarCardapio();
      this.carregarTreinos();
    }
  }

  private calcularCalorias() {
    try {
      const peso = this.dietForm.value.peso;
      let objetivo = this.dietForm.value.objetivo as 'perder' | 'manter' | 'ganhar';

      const ranges: Record<string, [number, number]> = {
        perder: [20, 25],
        manter: [25.1, 29.9],
        ganhar: [30, 35]
      };

      if (!ranges[objetivo]) {
        console.error('Objetivo inválido:', objetivo);
        objetivo = 'perder';
      }

      const [min, max] = ranges[objetivo];
      this.caloriasDiarias = peso * (min + Math.random() * (max - min));
    } catch (error) {
      console.error('Erro no cálculo de calorias:', error);
      this.caloriasDiarias = 0;
    }
  }

  private calcularMacronutrientes() {
    const peso = this.dietForm.value.peso;
    const proteinaKg = this.dietForm.value.proteinaPorKg;

    this.proteinas = peso * proteinaKg;
    const caloriasProteinas = this.proteinas * 4;
    const caloriasRestantes = this.caloriasDiarias - caloriasProteinas;

    this.carboidratos = (caloriasRestantes * 0.75) / 4;
    this.gorduras = (caloriasRestantes * 0.25) / 9;
  }

  private carregarCardapio() {
    const objeto = this.dietForm.value.objetivo;
    const modelo = this.dietForm.value.modeloAlimentar;
    const categoriaValida = this.validarCategoria(this.categoria);
    this.cardapioAtual = this.workoutService.getCardapio(categoriaValida, modelo, objeto);
  }

  private carregarTreinos() {
    const nivel = this.dietForm.value.nivelTreino as NivelTreino;
    this.treinos = this.workoutService.getTreinos(nivel);
  }

  private validarCategoria(categoria: string): CategoriaIMC {
    const categoriasValidas: CategoriaIMC[] = ['PP', 'P', 'M', 'G', 'GG', 'XG', 'EXG'];
    return categoriasValidas.includes(categoria as CategoriaIMC)
      ? categoria as CategoriaIMC
      : 'PP';
  }

  voltar() {
    this.etapaAtual = Math.max(1, this.etapaAtual - 1);
  }
}