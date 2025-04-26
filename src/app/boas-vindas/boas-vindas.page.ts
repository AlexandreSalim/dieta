import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boas-vindas',
  templateUrl: './boas-vindas.page.html',
  styleUrls: ['./boas-vindas.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, CommonModule, FormsModule]
})
export class BoasVindasPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cadastro() {
    this.router.navigate(['/cadastro'])
  }
  login() {
    this.router.navigate(['/login'])
  }
}
