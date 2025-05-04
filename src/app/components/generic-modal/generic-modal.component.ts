import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { IonModal } from "@ionic/angular/standalone";

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss'],
  standalone: true,
  imports: [IonModal, CommonModule],
})
export class GenericModalComponent {
  @ViewChild(IonModal) private modal!: IonModal;  
  @Input() isOpen = false;
  @Input() width = '90%';
  @Input() height = '50%';
  @Input() content!: TemplateRef<any>;  
  @Output() didDismiss = new EventEmitter<void>();
  
  
  handleDismiss() {
    console.log(this.isOpen)
    this.isOpen = false;
    this.didDismiss.emit();
  }

  public close() {
    this.modal.dismiss();
  }
}
