import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { PushNotifications } from '@capacitor/push-notifications';
import { IonHeader, IonContent, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { FcmService } from '../service/fcm.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: false
})
export class StartPage implements OnInit {
  protected showSplash: boolean = true;


  constructor(
    private readonly _router: Router,
    private readonly fcmService: FcmService
  ) { }
  
  ngOnInit() {
    setTimeout(() => {
      this.showSplash = false;
      this.fcmService.init();
    }, 5000);
  }

  escolha() {
    this._router.navigate(['/boas-vindas'])
  }

}
