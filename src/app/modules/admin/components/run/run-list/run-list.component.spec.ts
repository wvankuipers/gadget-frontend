import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification.service';
import { RunService } from '../../../services/run.service';
import { OverviewPageComponent } from '../../overview-page/overview-page.component';
import { RunListComponent } from './run-list.component';

describe('RunListComponent', () => {
  let component: RunListComponent;
  let fixture: ComponentFixture<RunListComponent>;
  let RunServiceSpy: jasmine.SpyObj<RunService>;
  let NotificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RunListComponent, MockComponent(OverviewPageComponent)],
        imports: [RouterTestingModule],
        providers: [
          {
            provide: RunService,
            useFactory: (): jasmine.SpyObj<RunService> => {
              RunServiceSpy = jasmine.createSpyObj('RunService', ['list']);

              RunServiceSpy.list.and.returnValue(EMPTY);

              return RunServiceSpy;
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
    fixture = TestBed.createComponent(RunListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
