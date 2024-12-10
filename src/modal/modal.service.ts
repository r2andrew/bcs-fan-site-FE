import { Injectable } from '@angular/core';
import { ModalComponent } from './modal.component';
/**
 * Interface with the modal component
 */
@Injectable({ providedIn: 'root' })
export class ModalService {
  /**
   * An array to hold the Modals active in the DOM
   * @private
   */
  private modals: ModalComponent[] = [];

  /**
   * Add a form to the DOM
   * @param modal The form to add
   */
  add(modal: ModalComponent): void {
    if (!modal.id || this.modals.find(x => x.id === modal.id)) {
      throw new Error('modal must have a unique id attribute');
    }
    this.modals.push(modal);
  }

  /**
   * Remove a form from the DOM
   * @param modal The form to remove
   */
  remove(modal: ModalComponent): void {
    this.modals = this.modals.filter(x => x !== modal);
  }

  /**
   * Display a form
   * @param id The form to display
   */
  open(id: string): void {
    const modal = this.modals.find(x => x.id === id);
    if (!modal) {
      throw new Error(`modal '${id}' not found`);
    }
    modal.open();
  }
  /**
   * Hide any open modals
   */
  close(): void {
    const modal = this.modals.find(x => x.isOpen);
    modal?.close();
  }
}
