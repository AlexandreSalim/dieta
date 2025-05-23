import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FcmService } from './service/fcm.service';
import { App as CapacitorApp } from '@capacitor/app';
import { Router } from '@angular/router';
import { UserStateService } from './service/user-state.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private fcm: FcmService,
    private router: Router,
    private userStateService: UserStateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Escuta o botão de voltar
      CapacitorApp.addListener('backButton', () => {
        // Se estiver na rota raiz, fecha o app
        if (this.router.url === '/start') {
          CapacitorApp.exitApp();
        } else {
          // Senão, volta uma página no histórico
          this.router.navigate(['../']);
        }
      });
    });
  }
}
