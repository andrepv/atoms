import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPaletteEditorShadesComponent } from './color-palette-editor-shades.component';

describe('ColorPaletteEditorShadesComponent', () => {
  let component: ColorPaletteEditorShadesComponent;
  let fixture: ComponentFixture<ColorPaletteEditorShadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPaletteEditorShadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPaletteEditorShadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
