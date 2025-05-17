import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';
import { PushNotifications, ActionPerformed, PushNotificationSchema, Token } from '@capacitor/push-notifications';
import { StorageService } from './storage.service';

export const FCM_TOKEN = 'push_notification_token';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  private _redirect = new BehaviorSubject<any>(null);

  get redirect() {
    return this._redirect.asObservable();
  }

  constructor(private storage: StorageService){ }
  
  init() {
    if(Capacitor.getPlatform() !== 'web') {
      this.registerPush();
    }
  }

  private async registerPush() {
    try {
      await this.addListeners();
      let permStatus = await PushNotifications.checkPermissions();

      if(permStatus.receive === 'prompt') {
        throw new Error('User denied permission!');
      }

      if(permStatus.receive !== 'granted') {
        throw new Error('User denied permission!');
      }

      await PushNotifications.register();
    } catch (error) {
      console.log(error);
    }
  }

  async getDeLiveredNotifications() {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }

  addListeners() {
    PushNotifications.addListener(
      'registration',
      async(token: Token) => {
        console.log('My token: ', token);
        const last_token = await this.storage.getStorage('token');
        await this.storage.setStorage('token', token.value);
      }
    )
    
    PushNotifications.addListener("registrationError", (error: any) => {
      console.log('Error', + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
        const data = notification?.data;
        if(data?.redirect) this._redirect.next(data?.redirect);
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        console.log('push data: ', data);
        if(data?.redirect) this._redirect.next(data?.redirect);
      }
    );
  }

  async removeFcmToken() {
    try {
      await this.storage.removeStorage("token");
    } catch (error) {
      throw(error);
    }
  }
}
