import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from './modal.service';

/**
 * Logic associated with modals
 */
@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
  /**
   * Optionally accept the elements id in the DOM
   */
  @Input() id?: string;
  /**
   * Boolean to hold if a particular modal is open or not
   */
  isOpen = false;
  /**
   * A reference to the modal within the DOM
   * @private
   */
  private element: any;

  /**
   * A constructor for the modal component
   * @constructor
   * @param modalService Connect to the Modal Service
   * @param el The modals reference in the DOM
   */
  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  /**
   * On page load, add the modal to the DOM
   */
  ngOnInit(): void {
    this.modalService.add(this);
    document.body.appendChild(this.element);
    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'modal') {
        this.close();
      }
    });
  }

  /**
   * On page close, remove the modal from the DOM
   */
  ngOnDestroy(): void {
    this.modalService.remove(this);
    this.element.remove();
  }

  /**
   * Set a modal element to display
   */
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
    this.isOpen = true;
  }

  /**
   * Set a modal element to hide
   */
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
    this.isOpen = false;
  }
}
