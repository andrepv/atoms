import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportEditorSharedActionsBarComponent } from './export-editor-shared-actions-bar.component';

describe('ExportEditorSharedActionsBarComponent', () => {
  let component: ExportEditorSharedActionsBarComponent;
  let fixture: ComponentFixture<ExportEditorSharedActionsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportEditorSharedActionsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportEditorSharedActionsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
