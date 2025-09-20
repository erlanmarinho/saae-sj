import { Component, HostListener } from '@angular/core';

import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentSlide: number = 0;
  slidesPerView: number = 3; // Padrão: 3 notícias por vez

  @HostListener('window:resize')
  onResize() {
    const screenWidth = window.innerWidth;
    this.slidesPerView = screenWidth <= 768 ? 1 : 3; // Ajusta para 1 notícia em telas menores
  }

  prevSlide() {
    const carouselWrapper = document.querySelector('.carousel-wrapper') as HTMLElement;
    const totalSlides = carouselWrapper.children.length;

    this.currentSlide = (this.currentSlide - 1 + totalSlides) % totalSlides;
    carouselWrapper.style.transform = `translateX(-${(this.currentSlide / this.slidesPerView) * 100}%)`;
  }

  nextSlide() {
    const carouselWrapper = document.querySelector('.carousel-wrapper') as HTMLElement;
    const totalSlides = carouselWrapper.children.length;

    this.currentSlide = (this.currentSlide + 1) % totalSlides;
    carouselWrapper.style.transform = `translateX(-${(this.currentSlide / this.slidesPerView) * 100}%)`;
  }
}
