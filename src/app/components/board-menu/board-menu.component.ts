import { Component, input, output, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuItem } from "@angular/material/menu";
import { Color } from '../../types';
import { MatMenuModule } from '@angular/material/menu';
import { BoardColorPickerComponent } from "../board-color-picker/board-color-picker.component";


import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ElementRef, ViewContainerRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-board-menu',
  imports: [
    CdkConnectedOverlay,
    MatIconModule,
    MatMenuItem,
    MatMenuModule,
    OverlayModule,
    PortalModule,
    BoardColorPickerComponent,
    MatButtonModule
],
  templateUrl: './board-menu.component.html',
  styleUrl: './board-menu.component.css'
})
export class BoardMenuComponent {
  readonly currentBackground = input.required<string>();
  @ViewChild('mainMenuTpl') mainMenuTpl!: TemplateRef<any>;
  @ViewChild('colorMenuTpl') colorMenuTpl!: TemplateRef<any>;

  private mainMenuRef?: OverlayRef;
  private colorMenuRef?: OverlayRef;
  selectedBackgroundEvent = output<Color[]>();

  constructor(
    private overlay: Overlay,
    private vcr: ViewContainerRef
  ) {}

  /*
  isOpen = false;
  isVisibilitySubmenuOpen = false;
  isChangingBackground = false;

  close () {
    this.isOpen = false;
    this.isVisibilitySubmenuOpen = false;
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  toggleVisibilitySubmenu(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isVisibilitySubmenuOpen = !this.isVisibilitySubmenuOpen;
  }
  toggleVisibilitySubmenu(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isVisibilitySubmenuOpen = !this.isVisibilitySubmenuOpen;
  }
  */


  setVisibility(value: 'public' | 'private') {
    console.log('Visibility:', value);
  }

  /* ===== MENÚ PRINCIPAL ===== */

  toggleMainMenu(origin: HTMLElement) {
    if (this.mainMenuRef) {
      this.closeMainMenu();
      return;
    }

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 6
        }
      ]);

    this.mainMenuRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    this.mainMenuRef.backdropClick().subscribe(() => {
      this.closeMainMenu();
    });

    this.mainMenuRef.attach(
      new TemplatePortal(this.mainMenuTpl, this.vcr)
    );
  }

  closeMainMenu() {
    this.closeColorMenu();
    this.mainMenuRef?.dispose();
    this.mainMenuRef = undefined;
  }

  /* ===== SUBMENU COLOR ===== */

  toggleColorMenu(origin: HTMLElement) {
    if (this.colorMenuRef) {
      this.closeColorMenu();
      return;
    }

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPositions([
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
          offsetX: 8
        }
      ]);

    this.colorMenuRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
    
    this.colorMenuRef.attach(
      new TemplatePortal(this.colorMenuTpl, this.vcr)
    );

  }

  closeColorMenu() {
    this.colorMenuRef?.dispose();
    this.colorMenuRef = undefined;
  }

  onColorSelected(color: string) {
    console.log('Color:', color);
    // opcional:
    // this.closeColorMenu();
    // this.closeMainMenu();
  }
  

  onBackgroundSelected(colors: Color[] | null) {
    if (!colors) return;
    this.selectedBackgroundEvent.emit(colors);
    // this.isChangingBackground = false;
  }
}