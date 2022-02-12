import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportEditorFormatsComponent } from './export-editor-formats.component';

describe('ExportEditorFormatsComponent', () => {
  let component: ExportEditorFormatsComponent;
  let fixture: ComponentFixture<ExportEditorFormatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportEditorFormatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportEditorFormatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
