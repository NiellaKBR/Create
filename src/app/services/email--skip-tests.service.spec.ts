import { TestBed } from '@angular/core/testing';

import { EmailSkipTestsService } from './email--skip-tests.service';

describe('EmailSkipTestsService', () => {
  let service: EmailSkipTestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailSkipTestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
