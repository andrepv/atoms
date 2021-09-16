import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenDropdownMenuComponent } from './token-dropdown-menu.component';

describe('TokenDropdownMenuComponent', () => {
  let component: TokenDropdownMenuComponent;
  let fixture: ComponentFixture<TokenDropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenDropdownMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
