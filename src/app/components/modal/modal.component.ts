import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Modal';
  @Input() type: 'devis' | 'contact' | 'confirmation' = 'devis';
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<any>();

  // Formulaire Devis Express
  devisForm = {
    entreprise: '',
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    service: '',
    description: '',
    urgence: 'normale'
  };

  services = [
    'Audit & Expertise comptable',
    'Conseil juridique & fiscal',
    'Formation professionnelle',
    'Ressources humaines',
    'Gestion immobilière',
    'Logistique & digitalisation',
    'Conseil en management'
  ];

  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    if (this.type === 'devis') {
      this.submitForm.emit(this.devisForm);
    }
    this.close();
  }

  // Fermer modal en cliquant sur l'overlay
  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
