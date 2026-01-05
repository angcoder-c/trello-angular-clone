import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDragScroll]',
  standalone: true
})
export class DragScrollDirective {
  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent): void {
    // solo responde cuando se presiona el click izquierdo
    // inicio del arrastre
    if (e.target !== this.el.nativeElement) return;
    if (e.button !== 0) return;
    
    this.isDown = true;
    this.el.nativeElement.style.userSelect = 'none';
    this.startX = e.pageX - this.el.nativeElement.offsetLeft;

    // posicion horizontal inicial del scroll
    this.scrollLeft = this.el.nativeElement.scrollLeft;
  }
  

  @HostListener('mouseup')
  onMouseUp(): void {
    this.isDown = false;
    this.el.nativeElement.style.userSelect = '';
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (!this.isDown) return;
    
    e.preventDefault();
    // posicion actual dentro del contenedor
    const x = e.pageX - this.el.nativeElement.offsetLeft;
    // distancia recorrida desde el inicio del arrastre
    const walk = (x - this.startX) * 1.2;
    // nueva posicion del scroll
    this.el.nativeElement.scrollLeft = this.scrollLeft - walk;
  }
}
