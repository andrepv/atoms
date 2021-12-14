import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenActionsComponent } from './token-actions.component';

describe('TokenActionsComponent', () => {
  let component: TokenActionsComponent;
  let fixture: ComponentFixture<TokenActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
