import { TestBed } from '@angular/core/testing';

import { FooterService } from './footer.service';

describe('FooterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FooterService = TestBed.get(FooterService);
    expect(service).toBeTruthy();
  });
});
