import { inject, TestBed } from '@angular/core/testing';
import { ErrorService } from './error.service';

describe('ErrorService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorService
      ]
    });
  });

  it('emitError() should emit data to error Subject',
    inject([ErrorService], (errorService: ErrorService) => {
      errorService.getError().subscribe((error) => {
        expect(error.errorType).toBe('NOT_FOUND');
      });

      errorService.emitError({ errorType: 'NOT_FOUND', title: 'Not found', message: 'Unknown flow: Start' });
    }));
});
