import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  // ================================
  // ESTADOS DO MENU
  // ================================

  /** Controla se o menu mobile está ativo (aberto) */
  menuActive: boolean = false;

  /** Controla se o dropdown "Serviços" está ativo */
  dropdownActive: boolean = false;

  /** Guarda o menu atualmente ativo para destacar visualmente */
  activeMenu: string = '';

  /** Controla se o submenu mobile está aberto */
  submenuOpen = false;

  // ================================
  // MÉTODOS DO COMPONENTE
  // ================================

  /**
   * Alterna o estado do menu mobile.
   * Chamado ao clicar no botão de menu (hamburger)
   */
  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  /**
   * Alterna o estado do dropdown desktop "Serviços".
   * @param event - evento de clique, usado para evitar propagação
   */
  toggleDropdown(event: Event) {
    event.stopPropagation(); // Impede que o clique feche imediatamente o dropdown
    this.dropdownActive = !this.dropdownActive;
    console.log('Dropdown Active:', this.dropdownActive);
  }

  /**
   * Define o menu ativo e fecha o dropdown.
   * Chamado ao clicar em outro item do menu.
   * @param menu - nome do menu clicado
   */
  setActive(menu: string) {
    this.activeMenu = menu;
    this.dropdownActive = false; // Fecha dropdown ao clicar em outro menu
  }

  /**
   * Listener global de cliques para fechar o dropdown quando clicar fora.
   * @param event - evento de clique do documento
   */
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;

    // Verifica se o clique foi fora do dropdown e do link "Serviços"
    if (!target.closest('.dropdown')) {
      this.dropdownActive = false;
    }
  }
}
