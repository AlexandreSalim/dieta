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
    ReactiveFormsModule
  ]
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
      password: formData.password,
      phone: formData.celular,
      age: 25, //temporario, vai sair daqui
      gender: 'gender' //temporario, vai sair daqui
    };
  
    this.authenticationService.createUser(userData).subscribe({
      next: (response) => {
        console.log('Usuário criado com sucesso:', response);
        this.router.navigate(['/escolha']);
      },
      error: (error) => {
        console.error('Erro ao criar usuário:', error);
        // Adicione tratamento de erros aqui
      }
    });
  }

  login() {
    this.router.navigate(['/login']);
  }
}
