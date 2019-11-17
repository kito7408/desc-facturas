import { TestBed, inject } from '@angular/core/testing';

import { TasasService } from './tasas.service';

describe('TasasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasasService]
    });
  });

  it('should be created', inject([TasasService], (service: TasasService) => {
    expect(service).toBeTruthy();
  }));
});
