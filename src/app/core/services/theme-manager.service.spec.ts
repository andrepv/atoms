/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThemeManagerService } from './theme-manager.service';

describe('Service: ThemeManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeManagerService]
    });
  });

  it('should ...', inject([ThemeManagerService], (service: ThemeManagerService) => {
    expect(service).toBeTruthy();
  }));
});
