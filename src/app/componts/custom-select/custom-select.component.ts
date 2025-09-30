import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Componente de Select Customizado
 * ---------------------------------------------------------------------------
 * - Exibe uma lista suspensa de opções e permite a seleção de um valor.
 * - Emite eventos quando o valor selecionado é alterado.
 */
@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss'
})
export class CustomSelectComponent {
  /**
   * Lista de opções exibidas no dropdown.
   * Cada objeto deve conter:
   *  - value: string  → valor único
   *  - label: string  → texto exibido
   */
  @Input() options: { value: string; label: string }[] = [];

  /**
   * Texto exibido quando nenhuma opção está selecionada.
   * Valor padrão: 'Selecione'.
   */
  @Input() placeholder: string = 'Selecione';

  /**
   * Valor atualmente selecionado (ligação bidirecional).
   */
  @Input() selectedValue: string = '';

  /**
   * Evento disparado sempre que o valor selecionado é alterado.
   */
  @Output() selectedValueChange = new EventEmitter<string>();

  /**
   * Controla a exibição da lista de opções (true = aberta).
   */
  isOpen = false;

  /**
   * Alterna a visibilidade do dropdown.
   */
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  /**
   * Seleciona a opção clicada:
   * - Define o valor selecionado
   * - Emite o evento de mudança
   * - Fecha o dropdown
   */
  selectOption(option: { value: string; label: string }): void {
    this.selectedValue = option.value;
    this.selectedValueChange.emit(option.value);
    this.isOpen = false;
  }

  /**
   * Retorna o rótulo correspondente ao valor selecionado.
   * Caso não haja valor, exibe o placeholder.
   */
  get selectedLabel(): string {
    const selected = this.options.find(opt => opt.value === this.selectedValue);
    return selected ? selected.label : this.placeholder;
  }
}
