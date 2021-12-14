import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTokensComponent } from './custom-tokens.component';

describe('CustomTokensComponent', () => {
  let component: CustomTokensComponent;
  let fixture: ComponentFixture<CustomTokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTokensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
