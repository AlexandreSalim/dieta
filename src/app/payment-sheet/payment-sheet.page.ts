import { Component, ViewChild } from '@angular/core';

import { first, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplePayEventsEnum, GooglePayEventsEnum, PaymentFlowEventsEnum, PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { UserStateService } from '../service/user-state.service';
import { GenericModalComponent } from '../components/generic-modal/generic-modal.component';


@Component({
  selector: 'app-payment-sheet',
  templateUrl: './payment-sheet.page.html',
  styleUrls: ['./payment-sheet.page.scss'],
  standalone: false,
})
export class PaymentSheetPage  {

  showModal: boolean = true;
  @ViewChild(GenericModalComponent)
  private genericModal!: GenericModalComponent;

  data: any = {
    name: 'alexandre',
    email: 'ale@gmail.com',
    amount: 100,
    currency: 'brl'
  };

   constructor(
    private http: HttpClient,
    private router: Router,
    private userStateService: UserStateService
   ) {
    Stripe.initialize({
      publishableKey: environment.stripe.publishableKey,
    });
  }

  httpPost(body: any){
    return this.http.post<any>('/payment-sheet', body).pipe(first());
  }

  async paymentShet() {
    // be able to get event of PaymentSheet
    try {
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed');
      });
      
      const data$ = this.httpPost(this.data);

      // Connect to your backend endpoint, and get every key.
      const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(data$);
    
      // prepare PaymentSheet with CreatePaymentSheetOption.
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: 'Caloria de bolso'
      });
    
      // present PaymentSheet and get result.
      const result = await Stripe.presentPaymentSheet();
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        // Happy path
        this.aplitAndJoin(paymentIntent);
      }
    
    } catch (error) {
      console.log(error, 'payment-sheet')
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

  const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(data$);
  
  await Stripe.createPaymentFlow({
    paymentIntentClientSecret: paymentIntent,
    customerEphemeralKeySecret: ephemeralKey,
    customerId: customer,
    merchantDisplayName: 'Technyks'
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
    const isAvailable = Stripe.isApplePayAvailable().catch(() => undefined);
    if(isAvailable === undefined) {
      return;
    }

    Stripe.addListener(ApplePayEventsEnum.Completed, () => {
      console.log('ApplePayEventsEnum.Completed');
    });
    
    const data$ = this.httpPost(this.data);
  
    const { paymentIntent } = await lastValueFrom(data$);

    await Stripe.createApplePay({
      paymentIntentClientSecret: paymentIntent,
      paymentSummaryItems: [{
        label: 'Technyks',
        amount: 1099.00
      }],
      merchantIdentifier: 'rdlabo',
      countryCode: 'BR',
      currency: 'BRL',
    });

    const result = await Stripe.presentApplePay();
    if(result.paymentResult === ApplePayEventsEnum.Completed) {
      //happy path
      this.aplitAndJoin(paymentIntent);
    }
  }

  async googlepay() {
    const isAvailable = Stripe.isGooglePayAvailable().catch(() => undefined);
    if(isAvailable === undefined) {
      return;
    }

    Stripe.addListener(GooglePayEventsEnum.Completed, () => {
      console.log('GooglePayEventsEnum.Completed');
    });

    // const data = new HttpParams({
    //   fromObject: this.data
    // });
  
    // const data$ = this.http.post<{
    //   paymentIntent: string;
    // }>(environment.api + 'payment-sheet', data).pipe(first());
    const data$ = this.httpPost(this.data);
  
    const { paymentIntent } = await lastValueFrom(data$);

    await Stripe.createGooglePay({
      paymentIntentClientSecret: paymentIntent,
      paymentSummaryItems: [{
        label: 'Technyks',
        amount: 1099.00
      }],
      merchantIdentifier: 'merchant.com.getcapacitor.stripe',
      countryCode: 'BR',
      currency: 'BRL',
    });

    const result = await Stripe.presentGooglePay();
    if(result.paymentResult === GooglePayEventsEnum.Completed) {
      //happy path
      this.aplitAndJoin(paymentIntent);
    }
  }

  aplitAndJoin(paymentIntent: any) {
    const result = paymentIntent.split('_').slice(0, 2).join('_');
    console.log('paymentIntent');
    return result;
  }

  testederota() {
    this.genericModal.close();
    this.showModal = false;
    this.router.navigate(['/escolher-dieta'])
  }
}
