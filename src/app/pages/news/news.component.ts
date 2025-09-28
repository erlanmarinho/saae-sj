import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomSelectComponent } from '../../componts/custom-select/custom-select.component';
import { FooterComponent } from '../../componts/footer/footer.component';
import { HeaderComponent } from '../../componts/header/header.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CustomSelectComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  @ViewChild('carouselWrapper') carousel!: ElementRef<HTMLDivElement>;
  currentSlide = 0;
  itemWidth = 0;
  modoAvancado = false;

  categoriaSelecionada: string = '';
  ordenacaoSelecionada: string = '';

  filtrosAtivos: { tipo: string; label: string; valor: string }[] = [];

  getBadgeClass(filtro: { tipo: string; valor: string }): string {
    if (!filtro) return 'badge-default';
    if (filtro.tipo === 'categoria') {
      switch (filtro.valor) {
        case 'avisos': return 'badge-avisos';
        case 'abastecimento': return 'badge-abastecimento';
        case 'institucional': return 'badge-institucional';
        default: return 'badge-default';
      }
    } else if (filtro.tipo === 'ordenacao') {
      return 'badge-ordenacao';
    }
    return 'badge-default';
  }

  onCategoriaChange(value: string) {
    this.removeFiltro('categoria');
    if (value) this.filtrosAtivos.push({ tipo: 'categoria', label: 'Categoria', valor: value });
  }

  onOrdenacaoChange(value: string) {
    this.removeFiltro('ordenacao');
    if (value) this.filtrosAtivos.push({ tipo: 'ordenacao', label: 'Ordenação', valor: value });
  }

  removeFiltro(tipo: string) {
    this.filtrosAtivos = this.filtrosAtivos.filter(f => f.tipo !== tipo);
  }

  clearFiltro(filtro: { tipo: string; label: string; valor: string }) {
    this.filtrosAtivos = this.filtrosAtivos.filter(f => f !== filtro);
  }

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
