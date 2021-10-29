import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ProjectService } from '../../../services/project.service';
import { OverviewPageComponent } from '../../overview-page/overview-page.component';
import { ProjectListComponent } from './project-list.component';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let ProjectServiceSpy: jasmine.SpyObj<ProjectService>;
  let NotificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProjectListComponent, MockComponent(OverviewPageComponent)],
        imports: [RouterTestingModule],
        providers: [
          {
            provide: ProjectService,
            useFactory: (): jasmine.SpyObj<ProjectService> => {
              ProjectServiceSpy = jasmine.createSpyObj('ProjectService', ['list']);

              ProjectServiceSpy.list.and.returnValue(EMPTY);

              return ProjectServiceSpy;
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
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
