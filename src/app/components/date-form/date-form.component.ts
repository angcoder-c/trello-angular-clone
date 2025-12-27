import { ChangeDetectionStrategy, Component, computed, ElementRef, HostListener, input, model, output, signal, viewChild } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-form',
  imports: [
    MatDatepickerModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule
],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './date-form.component.html',
  styleUrl: './date-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateFormComponent {
  currentDatetime = input<string | undefined | null>()
  selected = model<Date | null>(new Date());
  datetimeEvent = output<string | undefined>();

  ngOnInit () {
    this.selected.set(
      this.currentDatetime() 
      ? new Date(this.currentDatetime()!) 
      : new Date()
    )
  }

  date = computed(() => {
    const sel = this.selected();
    if (!sel) return '';
    const year = sel.getFullYear();
    const month = (sel.getMonth() + 1).toString().padStart(2, '0');
    const day = sel.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  time = signal<string>(
    this.selected()?.getHours().toString().padStart(2, '0') + ':' +
    this.selected()?.getMinutes().toString().padStart(2, '0')
  )

  dateForm = new FormGroup({
    time: new FormControl(this.time(), Validators.required)
  });

  submit() {
    const date = this.date().replaceAll('/', '-');
    const time = this.time()
    if (!date || !time) return;
    this.datetimeEvent.emit(new Date(`${date}T${time}:00.000Z`).toISOString());
  }

  remove() {
    this.selected.set(new Date());
    this.dateForm.reset({
      time: this.dateForm.get('time')?.value
    });
    this.datetimeEvent.emit(undefined)
  }

  changeTime(event: Event) {
    const input = event.target as HTMLInputElement;
    this.time.set(input.value);
  }
}
