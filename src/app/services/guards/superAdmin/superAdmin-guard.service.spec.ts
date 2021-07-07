import { TestBed } from '@angular/core/testing';

import { SuperAdminGuardService } from './superAdmin-guard.service';

describe('AdminService', () => {
  let service: SuperAdminGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperAdminGuardService);
  });

});
