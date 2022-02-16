import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPaletteEditorTintsComponent } from './color-palette-editor-tints.component';

describe('ColorPaletteEditorTintsComponent', () => {
  let component: ColorPaletteEditorTintsComponent;
  let fixture: ComponentFixture<ColorPaletteEditorTintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPaletteEditorTintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPaletteEditorTintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
