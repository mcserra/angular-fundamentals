import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Directive({
  selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit{

  @Input('modal-trigger') modalId: string; // its defined in the html that has the modal (ex. nav-bar.component)
  private el: HTMLElement;

  // pass the ref of the element binded to the directive (button in the case of NavBarComponent) and get the actual DOM element through ref.nativeElement
  constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any ) {
    this.el = ref.nativeElement;
  }

  ngOnInit() {
    this.el.addEventListener('click', e => {
      this.$(`#${this.modalId}`).modal({});
    });
  }
}
