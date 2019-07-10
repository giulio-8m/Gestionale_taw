import { TestBed } from '@angular/core/testing';

import { AuthSetService } from './auth-set.service';

describe('AuthSetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthSetService = TestBed.get(AuthSetService);
    expect(service).toBeTruthy();
  });
});
