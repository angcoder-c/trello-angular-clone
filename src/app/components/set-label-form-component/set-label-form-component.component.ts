import { Component } from '@angular/core';
import { LabelFormOptionComponent } from '../label-form-option/label-form-option.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-set-label-form-component',
  imports: [
    MatIcon,
    LabelFormOptionComponent
  ],
  templateUrl: './set-label-form-component.component.html',
  styleUrl: './set-label-form-component.component.css'
})
export class SetLabelFormComponentComponent {

}
