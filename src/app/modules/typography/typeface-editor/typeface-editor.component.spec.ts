import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypefaceEditorComponent } from './typeface-editor.component';

describe('TypefaceEditorComponent', () => {
  let component: TypefaceEditorComponent;
  let fixture: ComponentFixture<TypefaceEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypefaceEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypefaceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
