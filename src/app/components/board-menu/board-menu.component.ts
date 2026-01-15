import { Component, input, output, signal, TemplateRef, viewChild, ViewChild } from '@angular/core';
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
import { BoardDescriptionEditableComponent } from '../board-description-editable/board-description-editable.component';

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
    MatButtonModule,
    BoardDescriptionEditableComponent
],
  templateUrl: './board-menu.component.html',
  styleUrl: './board-menu.component.css'
})
export class BoardMenuComponent {
  readonly currentBackground = input.required<string>();
  @ViewChild('moreBtn') moreBtn!: ElementRef<HTMLElement>;
  @ViewChild('mainMenuTpl') mainMenuTpl!: TemplateRef<any>;
  @ViewChild('colorMenuTpl') colorMenuTpl!: TemplateRef<any>;
  @ViewChild('aboutBoardMenuTpl') aboutBoardMenuTpl!: TemplateRef<any>;

  private mainMenuRef?: OverlayRef;
  private colorMenuRef?: OverlayRef;
  private aboutBoardMenuRef?: OverlayRef;
  isPublic = signal<boolean>(true);

  selectedBackgroundEvent = output<Color[]>();

  constructor(
    private overlay: Overlay,
    private vcr: ViewContainerRef
  ) {}

  setVisibility(value: 'public' | 'private') {
    this.isPublic.set(value === 'public');
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

  // about board menu
  toggleAboutBoardMenu(origin: HTMLElement) {
    if (this.aboutBoardMenuRef) {
      this.closeAboutBoardMenu();
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

    this.aboutBoardMenuRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    this.aboutBoardMenuRef.backdropClick().subscribe(() => {
      this.closeAboutBoardMenu();
    });

    this.aboutBoardMenuRef.attach(
      new TemplatePortal(this.aboutBoardMenuTpl, this.vcr)
    );
  }

  closeAboutBoardMenu() {
    this.aboutBoardMenuRef?.dispose();
    this.aboutBoardMenuRef = undefined;
    this.closeMainMenu();
  }

  backToMainMenu() {
    this.closeColorMenu();
    this.closeAboutBoardMenu();
    this.toggleMainMenu(this.moreBtn.nativeElement);
  }

  onBackgroundSelected(colors: Color[] | null) {
    if (!colors) return;
    this.selectedBackgroundEvent.emit(colors);
    // this.isChangingBackground = false;
  }

  onDescriptionChange(newDescription: string) {
    console.log('New Board Description:', newDescription);
  }
}