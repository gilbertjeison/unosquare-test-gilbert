import { Component } from '@angular/core';
import { CharactersTableComponent } from "../../components/characters-table/characters-table.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CharactersTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
