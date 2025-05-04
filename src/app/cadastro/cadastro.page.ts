import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  IonContent,
  IonInput,
  IonButton,
  IonIcon,
  IonNote
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../util/passwordMatchValidator ';
import { UserStateService } from '../service/user-state.service';
import { AuthenticationService } from '../service/authentication.service';
import { CreateUserRequest } from '../interfaces/createUser.interface';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [
    IonNote,
    IonIcon,
    IonButton,
    IonInput,
    IonContent,
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()]
})
export class CadastroPage implements OnInit {
  // 1) Usando nonNullable em cada controle:
  formulario = new FormGroup(
    {
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)]
      }),
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      confirmpassword: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      celular: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      })
    },
    { validators: passwordMatchValidator }
  );
  showError = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private userStateService: UserStateService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  enviarDados() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      console.error('Formulário inválido');
      return;
    }
  
    const formData = this.formulario.getRawValue();
  
    // Mapear os dados do formulário para a interface CreateUserRequest
    const userData: CreateUserRequest = {
      full_name: formData.name,
      email: formData.email,
      phone: formData.celular,
      password: formData.password,
    };
  
    this.authenticationService.createUser(userData).subscribe({
      next: (response) => {
        console.log('Usuário criado com sucesso:', response);
        localStorage.setItem('token', response.token)
        this.router.navigate(['/escolha']);
      },
      error: (error) => {
        this.showError = true;

        if(error.status === 400) {
          this.errorMessage = 'Este e-mail já está cadastrado.';
          console.error(this.errorMessage);
        } 
        // Adicione tratamento de erros aqui
      }
    });
  }

  login() {
    this.router.navigate(['/login']);
  }
}
