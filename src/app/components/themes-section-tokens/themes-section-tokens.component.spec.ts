import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesSectionTokensComponent } from './themes-section-tokens.component';

describe('ThemesTokensSelectComponent', () => {
  let component: ThemesSectionTokensComponent;
  let fixture: ComponentFixture<ThemesSectionTokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemesSectionTokensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemesSectionTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
