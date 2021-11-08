import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokensSectionListComponent } from './tokens-section-list.component';

describe('ThemesTokensSelectComponent', () => {
  let component: TokensSectionListComponent;
  let fixture: ComponentFixture<TokensSectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokensSectionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokensSectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
