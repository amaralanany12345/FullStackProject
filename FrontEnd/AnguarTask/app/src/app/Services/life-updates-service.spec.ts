import { TestBed } from '@angular/core/testing';

import { LifeUpdatesService } from './life-updates-service';

describe('LifeUpdatesService', () => {
  let service: LifeUpdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifeUpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
