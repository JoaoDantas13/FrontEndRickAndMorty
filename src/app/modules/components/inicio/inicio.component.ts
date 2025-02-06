import { Component, OnInit } from '@angular/core';
import { PersonagemService } from 'src/app/shared/personagens.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  pesquisa: string = ''; // Variável que armazena o texto da pesquisa
  cards: any[] = []; // Lista de todos os cards
  filteredCards: any[] = []; // Lista de cards filtrados
  favoriteCards: any[] = []; // Lista de favoritos
  favoriteCount: number = 0; // Contador de favoritos

  constructor(private personagemService: PersonagemService) { }

  ngOnInit(): void {
    this.getPersonagens();
  }

  // Método para buscar os personagens
  getPersonagens() {
    this.personagemService.getPersonagem().subscribe((retorno) => {
      this.cards = retorno.results; // Recebe os dados dos personagens
      this.filteredCards = [...this.cards]; // Inicializa a lista filtrada com todos os cards

      // Carregar os favoritos salvos no localStorage
      this.loadFavorites();
    });
  }

  // Carregar os favoritos do localStorage
  loadFavorites() {
    const savedFavorites = localStorage.getItem('favoriteCards');
    if (savedFavorites) {
      this.favoriteCards = JSON.parse(savedFavorites);
      this.favoriteCount = this.favoriteCards.length;
      localStorage.setItem('favoriteCards', JSON.stringify(this.favoriteCards));
      localStorage.setItem('favoriteCount', JSON.stringify(this.favoriteCount));
      this.cards.forEach(card => {
        card.favorito = this.favoriteCards.some(favCard => favCard.id === card.id); // Marca como favorito se existir na lista de favoritos
      });
    }
    // Atualiza o contador de favoritos após carregar
    this.personagemService.updateFavoriteCount(this.favoriteCards.length); // Atualiza o contador
  }

  toggleFavorito(card: any) {
    // Alterna o status de favorito do card
    card.favorito = !card.favorito;
  
    // Se o card for marcado como favorito, adiciona à lista de favoritos
    if (card.favorito) {
      this.favoriteCards.push(card);
    } else {
      // Se for desmarcado, remove da lista de favoritos
      this.favoriteCards = this.favoriteCards.filter(favCard => favCard.id !== card.id);
    }
  
    // Atualiza a quantidade de favoritos
    this.favoriteCount = this.favoriteCards.length;
  
    // Armazena os favoritos e a contagem no localStorage
    localStorage.setItem('favoriteCards', JSON.stringify(this.favoriteCards));
    localStorage.setItem('favoriteCount', JSON.stringify(this.favoriteCount));
  
    // Atualiza o badge instantaneamente, sem precisar recarregar o navegador
    this.updateFavoriteCount();
  }

  updateFavoriteCount() {
    this.personagemService.updateFavoriteCount(this.favoriteCards.length); // Atualiza o contador de favoritos
  }

  // Método para filtrar os cards com base na pesquisa
  filtrarCards() {
    const pesquisaLower = this.pesquisa.toLowerCase(); // Transforma o texto da pesquisa para minúsculas

    if (this.pesquisa.trim() === '') {
      this.filteredCards = [...this.cards]; // Se o campo estiver vazio, mostra todos os cards
    } else {
      this.filteredCards = this.cards.filter(card =>
        card.name.toLowerCase().includes(pesquisaLower) ||
        card.species.toLowerCase().includes(pesquisaLower)
      ); // Filtra cards com base no nome ou espécie
    }
  }
}
