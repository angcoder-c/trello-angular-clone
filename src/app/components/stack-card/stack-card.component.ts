import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-stack-card',
  imports: [],
  templateUrl: './stack-card.component.html',
  styleUrl: './stack-card.component.css'
})
export class StackCardComponent {
  readonly cardUrl = input.required<string>();
  readonly cardName = input.required<string>();
}