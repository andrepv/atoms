import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPaletteEditorVariantsComponent } from './color-palette-editor-variants.component';

describe('ColorPaletteEditorVariantsComponent', () => {
  let component: ColorPaletteEditorVariantsComponent;
  let fixture: ComponentFixture<ColorPaletteEditorVariantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPaletteEditorVariantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPaletteEditorVariantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
