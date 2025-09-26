import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../componts/footer/footer.component';
import { HeaderComponent } from '../../componts/header/header.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  @ViewChild('carouselWrapper') carousel!: ElementRef<HTMLDivElement>;
  currentSlide = 0;
  itemWidth = 0;
  modoAvancado = false;


  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      this.calculateItemWidth();
      window.addEventListener('resize', () => this.calculateItemWidth());
    }
  }


  updateSlidePosition() {
    if (this.carousel) {
      this.carousel.nativeElement.style.transform = `translateX(-${this.currentSlide * this.itemWidth}px)`;
    }
  }

  calculateItemWidth() {
    // só executa se estivermos no navegador
    if (typeof window === 'undefined' || !this.carousel) return;

    const wrapper = this.carousel.nativeElement;
    const item = wrapper.children[0] as HTMLElement;
    if (!item) return;

    const style = window.getComputedStyle(wrapper);
    const gap = parseInt(style.gap || '0', 10);
    this.itemWidth = item.offsetWidth + gap;

    this.updateSlidePosition();
  }



}
