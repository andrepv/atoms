import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextStylesEditorComponent } from './text-styles-editor.component';

describe('TextStylesEditorComponent', () => {
  let component: TextStylesEditorComponent;
  let fixture: ComponentFixture<TextStylesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextStylesEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextStylesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
