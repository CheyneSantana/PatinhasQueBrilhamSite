import { TestBed } from '@angular/core/testing';

import { LojaService } from './loja.service';

describe('LojaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LojaService = TestBed.get(LojaService);
    expect(service).toBeTruthy();
  });
});
