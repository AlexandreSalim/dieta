import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonInput, IonButton, IonIcon, IonNote } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { AuthResponse, LoginRequest } from '../interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonNote, IonIcon, IonButton, IonInput, IonContent, CommonModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  formulario = new FormGroup({
    email: new FormControl('',{nonNullable: true, validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  }); // Aplica o validador no FormGroup

  showError = false;
  errorMessage = '';
  isLoading = false;
  
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {}

 onLogin() {
   if (this.formulario.invalid) {
     this.formulario.markAllAsTouched();
     return;
   }

   this.isLoading = true;
   const payload: LoginRequest = this.formulario.getRawValue();
   
   this.authenticationService.login(payload)
     .subscribe({
       next: (response: AuthResponse) => {
         // Token já armazenado no serviço via interceptor ou tap()
         this.router.navigate(['/home']);
       },
       error: (err: any) => {
         this.showError = true;
         this.errorMessage = err?.error?.message || 'Falha no login. Verifique suas credenciais.';
         console.error('Erro de login:', err);
       }
     })
     .add(() => {
       this.isLoading = false;
     });
 }

  cadastrar() {
    this.router.navigate(['/cadastro']);
  }
}
