import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FcmService } from './service/fcm.service';

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
  ) {
  }
}
