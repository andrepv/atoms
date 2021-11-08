import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokensSectionSelectComponent } from './tokens-section-select.component';

describe('SectionTokensSelectComponent', () => {
  let component: TokensSectionSelectComponent;
  let fixture: ComponentFixture<TokensSectionSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokensSectionSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokensSectionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
