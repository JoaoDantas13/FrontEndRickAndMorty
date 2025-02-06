import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritosComponent } from './modules/components/favoritos/favoritos.component';
import { InicioComponent } from './modules/components/inicio/inicio.component';

const routes: Routes = [
  {
    path: '', component: InicioComponent  // Esta é a rota padrão
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'favorito',
    component: FavoritosComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
