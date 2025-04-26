import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    
  },
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'exercicio-semanal',
    loadComponent: () => import('./exercicio-semanal/exercicio-semanal.page').then( m => m.ExercicioSemanalPage)
  },
  {
    path: 'escolha',
    loadComponent: () => import('./escolha/escolha.page').then( m => m.EscolhaPage)
  },
  {
    path: 'boas-vindas',
    loadComponent: () => import('./boas-vindas/boas-vindas.page').then( m => m.BoasVindasPage)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./cadastro/cadastro.page').then( m => m.CadastroPage)
  },
  {
    path: 'peso-altura',
    loadComponent: () => import('./peso-altura/peso-altura.page').then( m => m.PesoAlturaPage)
  },
  {
    path: 'imc',
    loadComponent: () => import('./imc/imc.page').then( m => m.ImcPage)
  },
  {
    path: 'objetivo',
    loadComponent: () => import('./objetivo/objetivo.page').then( m => m.ObjetivoPage)
  },
  {
    path: 'idade',
    loadComponent: () => import('./idade/idade.page').then( m => m.IdadePage)
  },
  {
    path: 'nivel-treino',
    loadComponent: () => import('./nivel-treino/nivel-treino.page').then( m => m.NivelTreinoPage)
  },
  {
    path: 'payment-sheet',
    loadChildren: () => import('./payment-sheet/payment-sheet.module').then( m => m.PaymentSheetPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
