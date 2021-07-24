import { TestBed } from '@angular/core/testing';

import { LoaderObsService } from './loader-obs.service';

describe('LoaderObsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaderObsService = TestBed.get(LoaderObsService);
    expect(service).toBeTruthy();
  });
});
