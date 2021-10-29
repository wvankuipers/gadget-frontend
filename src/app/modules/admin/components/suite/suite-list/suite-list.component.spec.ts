import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification.service';
import { SuiteService } from '../../../services/suite.service';
import { OverviewPageComponent } from '../../overview-page/overview-page.component';
import { SuiteListComponent } from './suite-list.component';

describe('SuiteListComponent', () => {
  let component: SuiteListComponent;
  let fixture: ComponentFixture<SuiteListComponent>;
  let SuiteServiceSpy: jasmine.SpyObj<SuiteService>;
  let NotificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SuiteListComponent, MockComponent(OverviewPageComponent)],
        imports: [RouterTestingModule],
        providers: [
          {
            provide: SuiteService,
            useFactory: (): jasmine.SpyObj<SuiteService> => {
              SuiteServiceSpy = jasmine.createSpyObj('SuiteService', ['list']);

              SuiteServiceSpy.list.and.returnValue(EMPTY);

              return SuiteServiceSpy;
            },
          },
          {
            provide: NotificationService,
            useFactory: (): jasmine.SpyObj<NotificationService> => {
              NotificationServiceSpy = jasmine.createSpyObj('NotificationService', ['triggerNotification']);

              return NotificationServiceSpy;
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
