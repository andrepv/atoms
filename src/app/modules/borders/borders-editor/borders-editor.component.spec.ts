import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BordersEditorComponent } from './borders-editor.component';

describe('BordersEditorComponent', () => {
  let component: BordersEditorComponent;
  let fixture: ComponentFixture<BordersEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BordersEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BordersEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
