import { Component, ElementRef, ViewChild } from '@angular/core';
import { GenericModalComponent } from '../components/generic-modal/generic-modal.component';
import { AuthenticationService } from '../service/authentication.service';
import { Dieta } from '../interfaces/dieta.interface';
import { interval, startWith, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppRate } from '@awesome-cordova-plugins/app-rate/ngx';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';

interface DrinkEntry {
  ml: number;
  time: Date;
}

interface Reminder {
  time: string;
  days: number[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  buffer = 0.06;
  progress = 0;
  metaMl = 2250;
  goalBeat = 0;

  showModal = false;
  showModalTime = false;
  dieta = false;
  home = true;
  daily = false;
  perfil = false;
  dark = false;

  // array de lembretes: cada um com hora e dias
  reminders: Reminder[] = [];
  // grupoDieta: Dieta[] = [];
  grupoDieta: (Dieta & { displayTime: string })[] = [];
  currentMeal: (Dieta & { displayTime: string }) | null = null;
  private timerSub!: Subscription;

  // arrays auxiliares para renderizar dias abreviados
  allDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
  daysSelected: Number[] = [];

  mlDays = ['50', '100', '200', '500', '1000'];
  mlDaysChecked: DrinkEntry[] = [];

  user: any = '';
  chartDays: string[] = [];
  chartValues: number[] = []; // por enquanto você pode inicializar com zeros
  todayIndex = 6;

  currentMeal1: Dieta | null = null;
  totalCalories = 0;
  selectedMeals = new Set<string>();
  days: string[] = [];
  values: number[] = [];
  highlightIndex = 0;

  @ViewChild('metaBatida') metaBatida!: ElementRef<HTMLDivElement>;
  private caloriesListener = () => this.loadChartData();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private platform: Platform,
    private appRate: AppRate,
    private iab: InAppBrowser,
    private social: SocialSharing,
    private emailComposer: EmailComposer,
  ) {
    this.platform.ready().then(() => {
      this.appRate.setPreferences({
        // URL de loja para cada plataforma
        storeAppURL: {
          ios:    'idSEU_ID_IOS',
          android: 'market://details?id=com.seupacote.app',
        },
        // quando o plugin precisar abrir uma URL, usamos o InAppBrowser
        openUrl: (url: string) => {
          this.iab.create(url, '_system');
        }
      });
    }).catch((error) => console.log('error'))
  }

  ngOnInit(): void {
    this.dark = localStorage.getItem('darkMode') === 'true';
    this.setClass(this.dark);
    this.totalCalories = parseFloat(localStorage.getItem('totalCalories') || '0');
    const sel = JSON.parse(localStorage.getItem('selectedMeals') || '{}') as Record<string, true>;
    this.selectedMeals = new Set(Object.keys(sel));
    this.loadChartData();
    window.addEventListener('caloriesUpdated', this.caloriesListener);
    this.initChartData();
    this.authenticationService
      .getUser()
      .subscribe((user) => (this.user = user));
    this.authenticationService.getDieta().subscribe({
      next: (dieta) => {
        // ordenar e preparar displayTime
        this.grupoDieta = dieta
          .sort((a: any, b: any) => a.meal_time.localeCompare(b.meal_time))
          .map((m: any) => ({
            ...m,
            displayTime: m.meal_time.slice(0, 5),
          }));
        // já dispara a verificação e depois a cada 1 minuto
        this.timerSub = interval(60_000)
          .pipe(startWith(0))
          .subscribe(() => this.updateCurrentMeal());
      },
      error: console.error,
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('caloriesUpdated', this.caloriesListener);
    this.timerSub?.unsubscribe();
  }

  private initChartData() {
    const today = new Date();
    this.chartDays = [];
    this.chartValues = [];

    // de 6 dias atrás até hoje
    for (let offset = 6; offset >= 0; offset--) {
      const d = new Date(today);
      d.setDate(today.getDate() - offset);
      this.chartDays.push(String(d.getDate()).padStart(2, '0'));
      this.chartValues.push(0);
    }

    // hoje fica no índice 6
    this.todayIndex = 6;
  }

  private updateCurrentMeal(): void {
    const now = new Date();
    const hhmm = now.toTimeString().slice(0, 5); // “HH:MM”

    // índice da próxima refeição cujo horário é > agora
    const nextIdx = this.grupoDieta.findIndex((m) => m.displayTime > hhmm);

    if (nextIdx <= 0) {
      // antes do primeiro (nextIdx === 0) ou depois do último (nextIdx === -1)
      // mostra sempre a última refeição da lista
      this.currentMeal = this.grupoDieta[this.grupoDieta.length - 1];
    } else {
      // em qualquer outro caso, exibe a refeição imediatamente anterior à próxima
      this.currentMeal = this.grupoDieta[nextIdx - 1];
    }
  }

  rateApp() {
    if (this.platform.is('cordova')) {
      // Emulador / dispositivo: usa o plugin
      this.appRate.promptForRating(true);
    } else {
      // Browser: fallback simples abrindo a URL da loja
      const url = this.platform.is('ios')
        ? 'https://apps.apple.com/app/idSEU_ID_IOS'
        : 'https://play.google.com/store/apps/details?id=com.seupacote.app';
      window.open(url, '_blank');
    }
  }

  shareApp() {
   const message = 'Confira este app incrível de dieta e saúde!';
   const url = 'https://play.google.com/store/apps/details?id=com.seupacote.app';

  if (navigator.share) {
    // Web Share API
    navigator.share({ title: 'Meu App de Dieta', text: message, url })
      .catch(err => console.error('Erro no share web:', err));
  } else {
    // In-app sharing no dispositivo
    this.social.share(message, 'Meu App de Dieta', 'null', url)
      .catch(err => console.error('Erro ao compartilhar', err));
  }
  }

 async contactSupport() {
    await this.platform.ready();

    const email: EmailComposerOptions = {
      to:      'alexandresalim8@gmail.com',
      subject:'Suporte App',
      body:    '',
      isHtml:  false
    };

    // verifica se pode enviar
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        // abre o composer nativo
        this.emailComposer.open(email);
      } else {
        // fallback web
        window.location.href = 'mailto:alexandresalim8@gmail.com?subject=Suporte App&body=Olá, preciso de ajuda sobre…';
      }
    });
  }
  

  mlDaysCheck(mlText: string) {
    const mlNum = parseInt(mlText, 10);
    this.mlDaysChecked.push({ ml: mlNum, time: new Date() });
    const total = this.getTotalMl();
    this.progress = total / this.metaMl;
    if (this.progress > 1) this.progress = 1;
    this.goalBeat = total * this.progress;
    if (this.goalBeat >= this.metaMl) {
      this.metaBatida.nativeElement.style.display = 'block';
      setTimeout(
        () => (this.metaBatida.nativeElement.style.display = 'none'),
        5000
      );
    }
  }

  getTotalMl(): number {
    return this.mlDaysChecked.reduce((sum, entry) => sum + entry.ml, 0);
    
  }

  close(index: number) {
    this.mlDaysChecked.splice(index, 1);
    const total = this.getTotalMl();
    this.progress = total / this.metaMl;
    if (this.progress > 1) this.progress = 1;
  }

  abrirModal() {
    this.showModal = true;
  }

  fecharModal() {
    this.showModal = false;
  }

  abrirLembreteModal() {
    this.showModalTime = true;
  }

  fecharLembreteModal() {
    this.showModalTime = false;
  }

  // callback do time-picker: adiciona um novo reminder
  onTimeConfirmed(timeDay: { time: string; days: number[] }) {
    this.daysSelected = [...timeDay.days];
    this.reminders.push({
      time: timeDay.time,
      days: [...timeDay.days],
    });
    console.log(this.daysSelected);
    this.fecharLembreteModal();
  }

  // remove reminder pelo índice
  removeReminder(idx: number) {
    this.reminders.splice(idx, 1);
  }

  fazerCadastro() {
    this.router.navigate(['/escolha']);
  }

  callDiet() {
    this.dieta = true;
    this.home = false;
    this.daily = false;
    this.perfil = false;
  }

  callHome() {
    this.home = true;
    this.dieta = false;
    this.daily = false;
    this.perfil = false;
  }

  callDaily() {
    this.daily = true;
    this.dieta = false;
    this.home = false;
    this.perfil = false;
  }

  callPerfil() {
    this.perfil = true;
    this.dieta = false;
    this.home = false;
    this.daily = false;
  }

  isChecked(mealId: string): boolean {
    return this.selectedMeals.has(mealId);
  }

  onToggleMeal(checked: boolean, calories: string, mealId: string) {
    const calNum = Number(calories);

    // 1) Atualiza selectedMeals e totalCalories
    if (checked) {
      if (!this.selectedMeals.has(mealId)) {
        this.selectedMeals.add(mealId);
        this.totalCalories += calNum;
      }
    } else {
      if (this.selectedMeals.delete(mealId)) {
        this.totalCalories = Math.max(0, this.totalCalories - calNum);
      }
    }

    // 2) Persiste totalCalories
    localStorage.setItem('totalCalories', this.totalCalories.toString());

    // 3) Persiste selectedMeals como objeto { id: true }
    const selObj: Record<string, true> = {};
    this.selectedMeals.forEach((id) => (selObj[id] = true));
    localStorage.setItem('selectedMeals', JSON.stringify(selObj));

    // 4) Atualiza o mapa de calorias por data
    const keyMap = 'caloriesByDate';
    const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
    const map: Record<string, number> = JSON.parse(
      localStorage.getItem(keyMap) || '{}'
    );

    // Inicializa o dia, soma ou subtrai conforme marcado/desmarcado
    map[today] = map[today] || 0;
    if (checked) {
      map[today] += calNum;
    } else {
      map[today] = Math.max(0, map[today] - calNum);
    }
    localStorage.setItem(keyMap, JSON.stringify(map));
    // depois de salvar o caloriesByDate no localStorage
    window.dispatchEvent(new CustomEvent('caloriesUpdated'));
  }

  loadChartData() {
    const keyMap = 'caloriesByDate';
    const map: Record<string, number> = JSON.parse(
      localStorage.getItem(keyMap) || '{}'
    );

    // Gera array de 6 dias atrás até hoje
    const today = new Date();
    const dates: Date[] = [];
    for (let offset = 6; offset >= 0; offset--) {
      const d = new Date(today);
      d.setDate(today.getDate() - offset);
      dates.push(d);
    }

    // Preenche labels (dia do mês) e valores (calorias ou zero)
    this.days = dates.map((d) => d.getDate().toString().padStart(2, '0'));
    this.values = dates.map((d) => {
      const key = d.toISOString().slice(0, 10); // 'YYYY-MM-DD'
      return map[key] ?? 0;
    });

    // Destaca hoje (o último índice)
    this.highlightIndex = this.values.length - 1;
    this.daily = true;
  }
   toggleDark(event: any) {
    this.dark = event.detail.checked;
    localStorage.setItem('darkMode', this.dark.toString());
    this.setClass(this.dark);
  }

  private setClass(isDark: boolean) {
    const htmlEl = document.documentElement;
    htmlEl.classList[ isDark ? 'add' : 'remove' ]('ion-palette-dark');
  }
}
