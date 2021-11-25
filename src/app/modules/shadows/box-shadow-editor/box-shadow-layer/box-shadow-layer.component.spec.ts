import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxShadowLayerComponent } from './box-shadow-layer.component';

describe('BoxShadowLayerComponent', () => {
  let component: BoxShadowLayerComponent;
  let fixture: ComponentFixture<BoxShadowLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxShadowLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxShadowLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
