import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { StackCardComponent } from '../../components/stack-card/stack-card.component';
import { AngularIcon } from '../../icons/angular-icon/angular-icon.component';
import { DexieIcon } from '../../icons/dexie-icon/dexie-icon.component';
import { TailwindIcon } from '../../icons/tailwind-icon/tailwind-icon.component';
import { TypescriptIcon } from '../../icons/typescript-icon/typescript-icon.component';
import { RxjsIcon } from '../../icons/rxjs-icon/rxjs-icon.component';
import { OauthIcon } from '../../icons/oauth-icon/oauth-icon.component';
import { PostcssIcon } from '../../icons/postcss-icon/postcss-icon.component';

@Component({
  selector: 'app-about',
  imports: [
    MatIcon,
    RouterLink,
    StackCardComponent,
    AngularIcon,
    DexieIcon,
    TailwindIcon,
    TypescriptIcon,
    RxjsIcon,
    OauthIcon,
    PostcssIcon
],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
