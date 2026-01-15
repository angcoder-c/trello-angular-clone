import { 
  Directive, 
  ElementRef, 
  EventEmitter, 
  HostListener, 
  output
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  clickOutside = output<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(target: EventTarget | null) {
    if (!target) return;
    
    const clickedInside = this.elementRef.nativeElement.contains(target as Node);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}