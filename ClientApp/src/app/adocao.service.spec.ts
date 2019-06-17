import { TestBed } from '@angular/core/testing';

import { AdocaoService } from './adocao.service';

describe('AdocaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdocaoService = TestBed.get(AdocaoService);
    expect(service).toBeTruthy();
  });
});
