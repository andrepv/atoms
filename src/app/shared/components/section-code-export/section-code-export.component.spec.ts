import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCodeExportComponent } from './section-code-export.component';

describe('SectionCodeExportComponent', () => {
  let component: SectionCodeExportComponent;
  let fixture: ComponentFixture<SectionCodeExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionCodeExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionCodeExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
