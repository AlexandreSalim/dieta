import { Component, ViewChild } from '@angular/core';

import { first, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ApplePayEventsEnum,
  GooglePayEventsEnum,
  PaymentFlowEventsEnum,
  PaymentSheetEventsEnum,
  Stripe,
} from '@capacitor-community/stripe';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { UserStateService } from '../service/user-state.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-payment-sheet',
  templateUrl: './payment-sheet.page.html',
  styleUrls: ['./payment-sheet.page.scss'],
  standalone: false,
})
export class PaymentSheetPage {
  public buffer = 0.06;
  public progress = 1;

  data: any = {
    // name: 'alexandre',
    // email: 'ale@gmail.com',
    amount: 100,
    currency: 'BRL',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private userStateService: UserStateService,
    private platform: Platform
  ) {
    Stripe.initialize({
      publishableKey: environment.stripe.publishableKey,
    });
  }

   async pay() {
    if (this.platform.is('android')) {
      await this.paymentShet();
    } 
    else if (this.platform.is('ios')) {
      await this.paymentShet();
    } 
    else {
      console.warn('Nenhum método de pagamento nativo disponível neste ambiente');
    }
  }

  httpPost(body: any) {
    return this.http
      .post<any>(`${environment.api}/payment-sheet`, body)
      .pipe(first());
  }

  async paymentShet() {
    // be able to get event of PaymentSheet
    try {
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed');
      });

      const token = localStorage.getItem('token')!;
      const headers = new HttpHeaders({
        Authorization: `${token}`,
      });

      const data$ = this.http
        .post<{ paymentIntent: string, ephemeralKey: string, customer: string }>(
          `${environment.api}/payment-sheet`,
          this.data,
          { headers }
        )
        .pipe(first());
      // Connect to your backend endpoint, and get every key.
      const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(
        data$
      );

      // prepare PaymentSheet with CreatePaymentSheetOption.
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: 'Caloria de bolso',
        enableApplePay: true,
        enableGooglePay: true,
        GooglePayIsTesting: true
      });

      // present PaymentSheet and get result.
      const result = await Stripe.presentPaymentSheet();
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        // Happy path
        this.aplitAndJoin(paymentIntent);
        this.router.navigate(['/escolher-dieta']);
      }
    } catch (error) {
      console.log(error, 'payment-sheet');
    }
  }

  async paymentFlow() {
    // be able to get event of PaymentFlow
    Stripe.addListener(PaymentFlowEventsEnum.Completed, () => {
      console.log('PaymentFlowEventsEnum.Completed');
    });

    // const data = new HttpParams({
    //   fromObject: this.data
    // });

    // const data$ = this.http.post<{
    //   paymentIntent: string;
    //   ephemeralKey: string;
    //   customer: string;
    // }>(environment.api + 'payment-sheet', data).pipe(first());

    const data$ = this.httpPost(this.data);

    const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(
      data$
    );

    await Stripe.createPaymentFlow({
      paymentIntentClientSecret: paymentIntent,
      customerEphemeralKeySecret: ephemeralKey,
      customerId: customer,
      merchantDisplayName: 'Technyks',
    });

    // Present PaymentFlow. **Not completed yet.**
    const presentResult = await Stripe.presentPaymentFlow();
    console.log(presentResult); // { cardNumber: "●●●● ●●●● ●●●● ****" }

    // Confirm PaymentFlow. Completed.
    const confirmResult = await Stripe.confirmPaymentFlow();
    if (confirmResult.paymentResult === PaymentFlowEventsEnum.Completed) {
      // Happy path
      this.aplitAndJoin(paymentIntent);
    }
  }

  async applePay() {
    const isAvailable = Stripe.isApplePayAvailable().catch((msg) => {
      console.log(msg);
      return undefined;
    });
    if (isAvailable === undefined) {
      return;
    }

    Stripe.addListener(ApplePayEventsEnum.Completed, () => {
      console.log('ApplePayEventsEnum.Completed');
    });

    const data$ = this.httpPost(this.data);

    const { paymentIntent } = await lastValueFrom(data$);

    await Stripe.createApplePay({
      paymentIntentClientSecret: paymentIntent,
      paymentSummaryItems: [
        {
          label: 'Technyks',
          amount: 1099.0,
        },
      ],
      merchantIdentifier: 'rdlabo',
      countryCode: 'BR',
      currency: 'BRL',
    });

    const result = await Stripe.presentApplePay();
    if (result.paymentResult === ApplePayEventsEnum.Completed) {
      //happy path
      this.aplitAndJoin(paymentIntent);
      this.router.navigate(['/escolher-dieta']);
    }
  }

  async googlepay() {
    const isAvailable = Stripe.isGooglePayAvailable().catch((msg) => {
      console.log(msg);
      return undefined;
    });
    if (isAvailable === undefined) {
      return;
    }

    Stripe.addListener(GooglePayEventsEnum.Completed, () => {
      console.log('GooglePayEventsEnum.Completed');
    });

    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    const data$ = this.http
      .post<{ paymentIntent: string }>(
        `${environment.api}/payment-sheet`,
        this.data,
        { headers }
      )
      .pipe(first());

    const { paymentIntent } = await lastValueFrom(data$);

    await Stripe.createGooglePay({
      paymentIntentClientSecret: paymentIntent,
      paymentSummaryItems: [
        {
          label: 'Technyks',
          amount: 1099.0,
        },
      ],
      merchantIdentifier: 'merchant.com.getcapacitor.stripe',
      countryCode: 'BR',
      currency: 'BRL',
    });

    const result = await Stripe.presentGooglePay();
    if (result.paymentResult === GooglePayEventsEnum.Completed) {
      //happy path
      this.aplitAndJoin(paymentIntent);
      this.router.navigate(['/escolher-dieta']);
    }
  }

  aplitAndJoin(paymentIntent: any) {
    const result = paymentIntent.split('_').slice(0, 2).join('_');
    console.log('paymentIntent');
    return result;
  }
}
