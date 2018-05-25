import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

// if you want to refer to a specific element we can add a ref like #modalcontainer wich is available to pass to any node or has an indicator for a @ViewChild (is just a wrapper to a DOM node)
// the same has injecting in constructor
// can use @ViewChildren for collections and  @ContentChild @ContentChildren for "ng-content"
//

@Component({
  selector: 'simple-modal',
  template: `
  <div id="{{elementId}}" #modalcontainer class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
          <h4 class="modal-title">{{title}}</h4>
        </div>
        <div class="modal-body" (click)="closeModal()">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .modal-body {height: 250px; overflow-y:scroll}
    `]
})
export class SimpleModalComponent {
  @Input() title: string;
  @Input() elementId: string;
  @Input() closeOnBodyClick: string;
  @ViewChild('modalcontainer') containerEl: ElementRef;

  constructor(@Inject(JQ_TOKEN) private $: any){}

  closeModal() {
    if (this.closeOnBodyClick === 'true'){
      this.$(this.containerEl.nativeElement).modal('hide');
    }
  }
}
