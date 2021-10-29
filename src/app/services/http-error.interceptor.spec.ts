import { TestBed } from '@angular/core/testing';
import { NotificationService } from '../modules/shared/services/notification.service';
import { HttpErrorInterceptor } from './http-error.interceptor';

describe('HttpErrorInterceptor', () => {
  let NotificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        HttpErrorInterceptor,
        {
          provide: NotificationService,
          useFactory: (): jasmine.SpyObj<NotificationService> => {
            NotificationServiceSpy = jasmine.createSpyObj('NotificationService', ['triggerNotification']);

            return NotificationServiceSpy;
          },
        },
      ],
    })
  );

  it('should be created', () => {
    const interceptor: HttpErrorInterceptor = TestBed.inject(HttpErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
