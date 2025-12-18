import { ChangeDetectionStrategy, Component, computed, model, signal } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-date-form',
  imports: [
    MatDatepickerModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './date-form.component.html',
  styleUrl: './date-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateFormComponent {
  selected = model<Date | null>(new Date());
  datetime = signal<string>(this.selected()?.toISOString() ?? '');

  date = computed(() => {
    const sel = this.selected();
    if (!sel) return '';
    const year = sel.getFullYear();
    const month = (sel.getMonth() + 1).toString().padStart(2, '0');
    const day = sel.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  });

  time = signal<string>(
    this.selected()?.getHours().toString().padStart(2, '0') + ':' +
    this.selected()?.getMinutes().toString().padStart(2, '0')
  )
}
