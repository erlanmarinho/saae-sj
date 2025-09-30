import { Component, ElementRef, ViewChild } from '@angular/core';
import { FooterComponent } from '../../componts/footer/footer.component';
import { HeaderComponent } from '../../componts/header/header.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss' // Observação: o correto seria 'styleUrls' no plural
})
export class HomeComponent {
  // Referência ao container do carrossel no template
  @ViewChild('carouselWrapper') carousel!: ElementRef<HTMLDivElement>;

  currentSlide = 0; // índice do slide atual
  itemWidth = 0;     // largura de cada item + gap do carrossel

  // =================== Ciclo de vida ===================
  ngAfterViewInit() {
    // Verifica se estamos no navegador (não server-side)
    if (typeof window !== 'undefined') {
      this.calculateItemWidth(); // calcula largura do item inicial
      // Atualiza largura ao redimensionar a tela
      window.addEventListener('resize', () => this.calculateItemWidth());
    }
  }

  // =================== Navegação do Carrossel ===================
  // Slide anterior
  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateSlidePosition();
    }
  }

  // Próximo slide
  nextSlide() {
    const wrapper = this.carousel.nativeElement;
    const maxSlide = wrapper.children.length - 1; // último índice
    if (this.currentSlide < maxSlide) {
      this.currentSlide++;
      this.updateSlidePosition();
    }
  }

  // =================== Atualiza posição ===================
  updateSlidePosition() {
    if (this.carousel) {
      this.carousel.nativeElement.style.transform = `translateX(-${this.currentSlide * this.itemWidth}px)`;
    }
  }

  // =================== Calcula largura do item ===================
  calculateItemWidth() {
    // Executa apenas no navegador e se a referência existir
    if (typeof window === 'undefined' || !this.carousel) return;

    const wrapper = this.carousel.nativeElement;
    const item = wrapper.children[0] as HTMLElement; // pega o primeiro item do carrossel
    if (!item) return;

    const style = window.getComputedStyle(wrapper);
    const gap = parseInt(style.gap || '0', 10); // considera o gap entre itens
    this.itemWidth = item.offsetWidth + gap;

    this.updateSlidePosition(); // aplica a nova posição
  }
}
