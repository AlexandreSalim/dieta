import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class PerfilComponent  implements OnInit {
  genero!: string;
  nome!: string;
  idade!: number;
  altura!: number;
  peso!: number;
  metaPeso!: number;

  constructor(private authenticationService: AuthenticationService, private router: Router) { 
    authenticationService.getUser().subscribe((user) => { 
      this.idade = user.age;
      this.genero = user.gender;
      this.nome = user.full_name;
    })

  }

  ngOnInit() {}

  end() {
    this.router.navigate(['/login']);
    localStorage.removeItem('token')
  }
}
