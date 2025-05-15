import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonContent, IonToolbar, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: false
})
export class StartPage implements OnInit {

  constructor(private readonly _router: Router) { }
  showSplash = true;
  
  ngOnInit() {
     setTimeout(() => {
      this.showSplash = false;
    }, 5000);
  }

  escolha() {
    this._router.navigate(['/boas-vindas'])
  }

}
