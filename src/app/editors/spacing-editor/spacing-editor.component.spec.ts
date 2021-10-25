import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacingEditorComponent } from './spacing-editor.component';

describe('SpacingEditorComponent', () => {
  let component: SpacingEditorComponent;
  let fixture: ComponentFixture<SpacingEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacingEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
