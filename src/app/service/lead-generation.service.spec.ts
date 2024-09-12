import { TestBed } from '@angular/core/testing';

import { LeadGenerationService } from './lead-generation.service';

describe('LeadGenerationService', () => {
  let service: LeadGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
