import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonagemService } from 'src/app/shared/personagens.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedOption: string = 'inicio';

  favoriteCount: number = 0; // Inicializa a variável de contagem

  constructor(private router: Router, private personagemService: PersonagemService) { }

  ngOnInit(): void {
    this.loadFavoriteCount();
    this.personagemService.favoriteCount$.subscribe(count => {
      this.favoriteCount = count;
    });
  }

  // Carregar a quantidade de favoritos do localStorage
  loadFavoriteCount() {
    const savedFavoriteCount = localStorage.getItem('favoriteCount');
    if (savedFavoriteCount) {
      this.favoriteCount = JSON.parse(savedFavoriteCount); // Atualiza a contagem de favoritos
    }
  }

  // Atualiza a quantidade de favoritos sempre que o localStorage for alterado
  updateFavoriteCount() {
    const savedFavoriteCount = localStorage.getItem('favoriteCount');
    if (savedFavoriteCount) {
      this.favoriteCount = JSON.parse(savedFavoriteCount);
    }
  }
  setSelectedOption(option: string) {
    this.selectedOption = option;
    if (this.selectedOption == 'favorito') {
      this.router.navigate(['/favorito'])
    } else {
      this.router.navigate(['/inicio'])

    }
  }
}
