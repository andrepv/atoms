import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportEditorToolbarComponent } from './export-editor-toolbar.component';

describe('ExportEditorToolbarComponent', () => {
  let component: ExportEditorToolbarComponent;
  let fixture: ComponentFixture<ExportEditorToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportEditorToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportEditorToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
