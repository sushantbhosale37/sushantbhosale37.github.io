import { TestBed } from '@angular/core/testing';

import { SaveQueryService } from './save-query.service';

describe('SaveQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveQueryService = TestBed.get(SaveQueryService);
    expect(service).toBeTruthy();
  });
});
