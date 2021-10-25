import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModularScaleEditorComponent } from './modular-scale-editor.component';

describe('ModularScaleEditorComponent', () => {
  let component: ModularScaleEditorComponent;
  let fixture: ComponentFixture<ModularScaleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModularScaleEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModularScaleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
