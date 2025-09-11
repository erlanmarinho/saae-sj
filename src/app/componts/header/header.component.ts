import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  activeMenu: string = ''; // Rastreia o item ativo

  setActive(menu: string) {
    this.activeMenu = menu; // Define o item ativo
  }
}
