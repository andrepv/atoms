import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxShadowEditorComponent } from './box-shadow-editor.component';

describe('BoxShadowEditorComponent', () => {
  let component: BoxShadowEditorComponent;
  let fixture: ComponentFixture<BoxShadowEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxShadowEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxShadowEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
