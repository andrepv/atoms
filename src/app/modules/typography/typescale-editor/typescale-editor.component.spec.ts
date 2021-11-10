import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescaleEditorComponent } from './typescale-editor.component';

describe('TypescaleEditorComponent', () => {
  let component: TypescaleEditorComponent;
  let fixture: ComponentFixture<TypescaleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypescaleEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypescaleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
