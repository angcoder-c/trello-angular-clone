import { Component, ElementRef, HostListener, input, output, signal, viewChild } from '@angular/core';

// componente para titulo editable de una lista o card

@Component({
  selector: 'app-title-editable',
  imports: [],
  templateUrl: './title-editable.component.html',
  styleUrl: './title-editable.component.css'
})
export class TitleEditableComponent {
  readonly title = input<string>()
  readonly modifyTitleEvent = output<string>()
  inputElementRef=viewChild<ElementRef>('title')

  modifyTitle = signal<string>('')
  editable = signal<boolean>(false)

  ngOnInit() {
    this.modifyTitle.set(this.title() || '')
  }

  edit() {
    this.editable.set(true)

    setTimeout(() => {
      const input = this.inputElementRef()?.nativeElement;
      if (input) input.focus();
    });
  }

  onTitleBlur() {
    this.editable.set(false);
  }

  onTitleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const input = event.target as HTMLInputElement;
      this.modifyTitle.set(input.value);
      this.modifyTitleEvent.emit(input.value)
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
}
