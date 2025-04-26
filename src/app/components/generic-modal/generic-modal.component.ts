import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { IonModal } from "@ionic/angular/standalone";

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss'],
  standalone: true,
  imports: [IonModal, CommonModule],
})
export class GenericModalComponent {
  /** controla se o modal está aberto */
  @Input() isOpen = false;

  /** largura e altura podem vir em px, %, rem… */
  @Input() width = '90%';
  @Input() height = '50%';

  /** aqui vai o template que o usuário passar quando usar o modal */
  @Input() content!: TemplateRef<any>;

  /** notifica quando o usuário fecha o modal (backdrop, botão, etc) */
  @Output() didDismiss = new EventEmitter<void>();
  
  
  handleDismiss() {
    this.didDismiss.emit();
  }
}
