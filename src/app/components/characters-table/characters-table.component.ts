import { Component } from '@angular/core';
import { CharacterCardComponent } from "../character-card/character-card.component";
import { Character } from '../../interfaces/character';
import { RicknmortyapiService } from '../../services/ricknmortyapi.service';
import { ApiResponse } from '../../interfaces/api-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'CharactersTable',
  standalone: true,
  imports: [CharacterCardComponent, CommonModule],
  templateUrl: './characters-table.component.html',
  styleUrl: './characters-table.component.css'
})
export class CharactersTableComponent {
  hasNextPage: boolean = false;
  hasPreviousPage: boolean = false;
  characters: Character[] = [];
  currentPage: number = 1;

  constructor(private api: RicknmortyapiService) { }

  ngOnInit(): void {
    this.fetchNextPage();
  }

  fetchNextPage(): void {
    this.api.getNextPage().subscribe((response) => {
      this.updateData(response);
    });
  }

  fetchPreviousPage(): void {
    this.api.getPreviousPage().subscribe((response) => {
      this.updateData(response);
    });
  }

  private updateData(response: any): void {
    this.characters = response.characters;
    this.hasNextPage = response.hasNextPage;
    this.hasPreviousPage = response.hasPreviousPage;
  }
}
