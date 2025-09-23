import { Component, ElementRef, ViewChild } from '@angular/core';

import { FooterComponent } from '../../componts/footer/footer.component';
import { HeaderComponent } from '../../componts/header/header.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('carouselWrapper') carousel!: ElementRef<HTMLDivElement>;
  currentSlide = 0;
  itemWidth = 0;

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      this.calculateItemWidth();
      window.addEventListener('resize', () => this.calculateItemWidth());
    }
  }




  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateSlidePosition();
    }
  }

  nextSlide() {
    const wrapper = this.carousel.nativeElement;
    const maxSlide = wrapper.children.length - 1;
    if (this.currentSlide < maxSlide) {
      this.currentSlide++;
      this.updateSlidePosition();
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
