import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonProgressBar, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-progress-h1',
  templateUrl: './progress-h1.component.html',
  styleUrls: ['./progress-h1.component.scss'],
  standalone: true,
  imports: [IonIcon, IonProgressBar]
})
export class ProgressH1Component  implements OnInit {

  public buffer = 0.06;

  @Input({ required: true}) progress: number = 0;
  @Input({ required: true}) h1: string = '';
   @Input() backRoute?: string;

  constructor(private router: Router) { }

  ngOnInit() {}

  
  telaAnterior() {
    if (this.backRoute) {
      // se a rota foi passada, navega pra ela
      this.router.navigateByUrl(this.backRoute);
    } else {
      // fallback: volta no histórico
      history.back();
    }
  }
}
