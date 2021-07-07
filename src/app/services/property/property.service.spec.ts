import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { PropertyService } from './property.service';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

describe('PropertyService', () => {
  let service: PropertyService;
  let http: HttpClientModule;
  let backend: HttpTestingController;
  const urlServer = environment.urlServer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterModule.forRoot([]), HttpClientTestingModule ],
      providers: [ PropertyService ]
    });
    service = TestBed.inject(PropertyService);
  });

  beforeEach(inject([PropertyService, HttpClientModule, HttpTestingController], (
    conf: PropertyService,
    h: HttpClientModule,
    b: HttpTestingController
  ) => {
      service = conf;
      http = h;
      backend = b;
  }));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should get data', () => {
    service.countWaitingValidationPropertiesFromServers().subscribe(res => {
      expect(res).toBe(12);
    });

    const req = backend.expectOne({
        url: urlServer + 'properties/all/waiting/count',
        method: 'GET'
    });

    req.flush(12, { status: 200, statusText: 'ok' });
  });
});
