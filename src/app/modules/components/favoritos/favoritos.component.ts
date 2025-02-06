import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

   // Lista para armazenar os cards favoritos
   favoriteCards: any[] = [];

   ngOnInit(): void {
     // Recupera os cards favoritos do localStorage na inicialização
     const savedFavorites = localStorage.getItem('favoriteCards');
     
     if (savedFavorites) {
       // Se existirem favoritos salvos, converte para objeto e armazena na variável favoriteCards
       this.favoriteCards = JSON.parse(savedFavorites);
     }
   }

}
