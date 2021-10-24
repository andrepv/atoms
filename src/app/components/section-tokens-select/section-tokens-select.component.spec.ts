import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTokensSelectComponent } from './section-tokens-select.component';

describe('SectionTokensSelectComponent', () => {
  let component: SectionTokensSelectComponent;
  let fixture: ComponentFixture<SectionTokensSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTokensSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTokensSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
