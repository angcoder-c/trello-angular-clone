import { Component, computed, input, output, signal, TemplateRef, viewChild, ViewChild } from '@angular/core';
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
import { backgroundColorToStyle } from '../../colors';

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
  // viewChild references for menu templates and buttons
  moreBtn = viewChild.required<ElementRef<HTMLElement>>('moreBtn')
  mainMenuTpl = viewChild.required<TemplateRef<any>>('mainMenuTpl')
  colorMenuTpl = viewChild.required<TemplateRef<any>>('colorMenuTpl')
  aboutBoardMenuTpl = viewChild.required<TemplateRef<any>>('aboutBoardMenuTpl')

  private mainMenuRef?: OverlayRef;
  private colorMenuRef?: OverlayRef;
  private aboutBoardMenuRef?: OverlayRef;

  // background handling
  readonly currentBackground = input.required<Color[]>();
  boardBgColor = computed(()=>{
    const backgroundColor = this.currentBackground()
    if (!backgroundColor) return '#083b82'
    return backgroundColorToStyle(backgroundColor)
  })
  
  // board visibility
  isPublic = signal<boolean>(true);

  // about board
  readonly description = input.required<string | null>();
  readonly isPublicInput = input.required<boolean>();
  
  // event
  descriptionChangedEvent = output<string>();
  isPublicChangedEvent = output<boolean>();
  selectedBackgroundEvent = output<Color[]>();

  constructor(
    private overlay: Overlay,
    private vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    this.isPublic.set(this.isPublicInput());
  }

  // TOGGLE MENUS

  // main menu
  toggleMainMenu(origin: HTMLElement) {
    if (this.mainMenuRef) {
      this.closeMainMenu();
      return undefined;
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
      new TemplatePortal(this.mainMenuTpl(), this.vcr)
    );
  }

  // color menu
  toggleColorMenu(origin: HTMLElement) {
    if (this.colorMenuRef) {
      this.closeColorMenu();
      return undefined;
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
      new TemplatePortal(this.colorMenuTpl(), this.vcr)
    );
  }

  // about board menu
  toggleAboutBoardMenu(origin: HTMLElement) {
    if (this.aboutBoardMenuRef) {
      this.closeAboutBoardMenu();
      return undefined;
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
      new TemplatePortal(this.aboutBoardMenuTpl(), this.vcr)
    );
  }

  // CLOSE MENUS

  closeMainMenu() {
    this.closeColorMenu();
    this.mainMenuRef?.dispose();
    this.mainMenuRef = undefined;
  }

  closeColorMenu() {
    this.colorMenuRef?.dispose();
    this.colorMenuRef = undefined;
  }
  
  closeAboutBoardMenu() {
    this.aboutBoardMenuRef?.dispose();
    this.aboutBoardMenuRef = undefined;
    this.closeMainMenu();
  }
  
  backToMainMenu() {
    this.closeColorMenu();
    this.closeAboutBoardMenu();
    this.toggleMainMenu(this.moreBtn().nativeElement);
  }

  // visibility menu
  setVisibility(isPublic: boolean) {
    this.isPublic.set(isPublic);
    this.isPublicChangedEvent.emit(isPublic);
  }

  // color menu
  onBackgroundSelected(colors: Color[] | null) {
    if (!colors) return;
    this.selectedBackgroundEvent.emit(colors);
  }

  // about board menu
  onDescriptionChange(newDescription: string) {
    this.descriptionChangedEvent.emit(newDescription);
  }
}