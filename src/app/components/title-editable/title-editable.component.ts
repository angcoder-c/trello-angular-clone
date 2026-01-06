import { Component, effect, ElementRef, HostListener, input, output, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

// componente para titulo editable de una lista o card

@Component({
  selector: 'app-title-editable',
  imports: [
    FormsModule
  ],
  templateUrl: './title-editable.component.html',
  styleUrl: './title-editable.component.css'
})
export class TitleEditableComponent {
  readonly title = input<string>()
  readonly expandable = input<boolean | undefined>(true)
  readonly maxWidth = input<number | undefined>(undefined)
  readonly modifyTitleEvent = output<string>()
  inputElementRef=viewChild<ElementRef>('title')
  
  modifyTitle: string | undefined = ''
  editable = signal<boolean>(false)

  ghostRef = viewChild<ElementRef>('ghost')
  containerRef = viewChild<ElementRef>('container')

  width = signal<number>(0)

  constructor () {}
  
  ngOnInit() {
    this.modifyTitle = this.title()
  }

  edit() {
    this.editable.set(true)

    setTimeout(() => {
      const input = this.inputElementRef()?.nativeElement;
      if (input) {
        input.focus()
        this.autoResize({ target: input } as any)
      } 
    });
  }

  onTitleBlur() {
    this.editable.set(false);
    if (this.modifyTitle !== this.title()) {
      this.modifyTitleEvent.emit(
        this.modifyTitle?.replaceAll('\n', '') || 
        ''
      );
    }
  }

  onTitleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.modifyTitleEvent.emit(
        this.modifyTitle?.replaceAll('\n', '') || 
        ''
      );
      this.editable.set(false);
    } else if (event.key === 'Escape') {
      this.editable.set(false);
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const form = this.inputElementRef()?.nativeElement;
    
    if (!form) return;
    if (!form.contains(event.target as Node)) {
      this.onTitleBlur();
    }
  }

  autoResize(e: Event) {
    if (!this.expandable()) return;
    const t = e.target as HTMLTextAreaElement;
    t.style.height = 'auto';
    t.style.height = `${t.scrollHeight}px`;
  }

  ngAfterViewInit() {
    this.width.set(this.containerRef()?.nativeElement.offsetWidth)
  }
}
