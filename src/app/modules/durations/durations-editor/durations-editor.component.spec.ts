import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationsEditorComponent } from './durations-editor.component';

describe('DurationsEditorComponent', () => {
  let component: DurationsEditorComponent;
  let fixture: ComponentFixture<DurationsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DurationsEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
