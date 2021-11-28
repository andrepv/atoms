import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerPresetPresetComponent } from './color-picker-preset.component';

describe('PresetColorsComponent', () => {
  let component: ColorPickerPresetPresetComponent;
  let fixture: ComponentFixture<ColorPickerPresetPresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPickerPresetPresetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerPresetPresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
