import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FooterComponent } from '../../componts/footer/footer.component';
import { HeaderComponent } from '../../componts/header/header.component';

// =================== COMPONENTE ===================
// Componente standalone que exibe o detalhe de uma notícia
@Component({
  selector: 'app-new-detail',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './new-detail.component.html',
  styleUrl: './new-detail.component.scss'
})
export class NewDetailComponent {
  // =================== PROPRIEDADES ===================
  id: string | null = null; // armazena o ID da notícia atual (vindo da rota)

  // =================== CONSTRUTOR ===================
  constructor(private route: ActivatedRoute) {
    // ActivatedRoute permite acessar parâmetros da rota, como o ID da notícia
  }

  // =================== CICLO DE VIDA ===================
  ngOnInit(): void {
    // Obtém o parâmetro 'id' da URL ao inicializar o componente
    this.id = this.route.snapshot.paramMap.get('id');
    // Exemplo de URL: /news/123 -> this.id = '123'
  }
}
