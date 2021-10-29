import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification.service';
import { TestService } from '../../../services/test.service';
import { OverviewPageComponent } from '../../overview-page/overview-page.component';
import { TestListComponent } from './test-list.component';

describe('TestListComponent', () => {
  let component: TestListComponent;
  let fixture: ComponentFixture<TestListComponent>;
  let TestServiceSpy: jasmine.SpyObj<TestService>;
  let NotificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestListComponent, MockComponent(OverviewPageComponent)],
        imports: [RouterTestingModule],
        providers: [
          {
            provide: TestService,
            useFactory: (): jasmine.SpyObj<TestService> => {
              //
              TestServiceSpy = jasmine.createSpyObj('TestService', ['list']);

              TestServiceSpy.list.and.returnValue(EMPTY);

              return TestServiceSpy;
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
    fixture = TestBed.createComponent(TestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
