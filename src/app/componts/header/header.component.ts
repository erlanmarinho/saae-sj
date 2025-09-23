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
  menuActive: boolean = false;
  dropdownActive: boolean = false;
  activeMenu: string = '';
  submenuOpen = false;


  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  toggleDropdown(event: Event) {
    event.stopPropagation(); // Impede que o clique no link "Serviços" feche o dropdown
    this.dropdownActive = !this.dropdownActive;
    console.log('Dropdown Active:', this.dropdownActive);
  }

  setActive(menu: string) {
    this.activeMenu = menu;
    this.dropdownActive = false; // Fecha o dropdown ao clicar em outro menu
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    // Verifica se o clique foi fora do dropdown e do link "Serviços"
    if (!target.closest('.dropdown')) {
      this.dropdownActive = false;
    }
  }
}
