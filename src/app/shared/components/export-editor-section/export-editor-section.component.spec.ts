import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportEditorSectionComponent } from './export-editor-section.component';

describe('ExportEditorSectionComponent', () => {
  let component: ExportEditorSectionComponent;
  let fixture: ComponentFixture<ExportEditorSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportEditorSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportEditorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
