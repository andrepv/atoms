import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextStylesEditorGroupComponent } from './text-styles-editor-group.component';

describe('TextStylesEditorGroupComponent', () => {
  let component: TextStylesEditorGroupComponent;
  let fixture: ComponentFixture<TextStylesEditorGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextStylesEditorGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextStylesEditorGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
