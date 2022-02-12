import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportCodePreviewComponent } from './export-code-preview.component';

describe('ExportCodePreviewComponent', () => {
  let component: ExportCodePreviewComponent;
  let fixture: ComponentFixture<ExportCodePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportCodePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportCodePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
