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

  ngOnInit() {
  }

  escolha() {
    this._router.navigate(['/boas-vindas'])
  }

}
