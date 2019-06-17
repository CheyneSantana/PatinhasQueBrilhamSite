import { TestBed } from '@angular/core/testing';

import { PatinhasService } from './patinhas.service';

describe('PatinhasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatinhasService = TestBed.get(PatinhasService);
    expect(service).toBeTruthy();
  });
});
